#!/usr/bin/env bash
set -euo pipefail

# Stop old servers
pkill -f "node server.cjs" 2>/dev/null || true
pkill -f "node server.js" 2>/dev/null || true

# Start server (CommonJS variant)
node server.cjs > server.log 2>&1 &
PID=$!
echo "Started server PID=$PID"

# Wait for startup
sleep 3

echo '--- health ---'
if ! curl -sf http://localhost:3000/healthz > /dev/null; then
  echo "Health check failed"
  echo '---- server.log (tail) ----'
  tail -n 80 server.log || true
  exit 1
fi
echo OK

# Create volunteer
echo '--- create volunteer ---'
VOL_JSON=$(curl -sS -X POST http://localhost:3000/api/profile/upsert \
  -H 'Content-Type: application/json' \
  -d '{"type":"volunteer","name":"Test V","skills":["web design","copywriting"],"interests":["education"],"availability":"weekends","city":"Pune"}')
echo "$VOL_JSON"
VOL_ID=$(printf '%s' "$VOL_JSON" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{console.log(JSON.parse(d).id||'')}catch{}})")
echo "VOL_ID=$VOL_ID"

# Create NGO
echo '--- create ngo ---'
NGO_JSON=$(curl -sS -X POST http://localhost:3000/api/profile/upsert \
  -H 'Content-Type: application/json' \
  -d '{"type":"ngo","name":"Teach4All","needs":["web designer","content"],"cause":"education","schedule":"weekends","city":"Pune"}')
echo "$NGO_JSON"
NGO_ID=$(printf '%s' "$NGO_JSON" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{try{console.log(JSON.parse(d).id||'')}catch{}})")
echo "NGO_ID=$NGO_ID"

# Volunteer -> NGOs recs
if [[ -n "$VOL_ID" ]]; then
  echo '--- recommend (volunteer -> NGOs) ---'
  curl -sS -X POST http://localhost:3000/api/recommend/ngos \
    -H 'Content-Type: application/json' \
    -d '{"volunteerId":"'"$VOL_ID"'","city":"Pune"}' | sed 's/},{/},\n{/g'
fi

# NGO -> Volunteers recs
if [[ -n "$NGO_ID" ]]; then
  echo '--- recommend (NGO -> volunteers) ---'
  curl -sS -X POST http://localhost:3000/api/recommend/volunteers \
    -H 'Content-Type: application/json' \
    -d '{"ngoId":"'"$NGO_ID"'","city":"Pune"}' | sed 's/},{/},\n{/g'
fi

############################################
# Extra seeding to generate non-empty recs #
############################################

echo '--- seeding additional sample NGOs ---'
READONLY_SEED_NGOS='[
 {"type":"ngo","name":"GreenYouth","needs":["tree planting","content"],"cause":"environment","schedule":"weekends","city":"Pune"},
 {"type":"ngo","name":"Code4Kids","needs":["web design","mentoring"],"cause":"education","schedule":"evenings","city":"Pune"},
 {"type":"ngo","name":"HealthBridge","needs":["copywriting","outreach"],"cause":"health","schedule":"weekdays","city":"Pune"}
]'

echo "$READONLY_SEED_NGOS" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",async()=>{const arr=JSON.parse(d);const f=async o=>{const r=await (await fetch("http://localhost:3000/api/profile/upsert",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();console.log("seeded NGO",r.id);};for(const o of arr) await f(o);})'

# Seed extra volunteers for reverse direction
echo '--- seeding additional sample volunteers ---'
READONLY_SEED_VOLS='[
 {"type":"volunteer","name":"Asha","skills":["web design"],"interests":["education"],"availability":"evenings","city":"Pune"},
 {"type":"volunteer","name":"Ravi","skills":["copywriting"],"interests":["environment"],"availability":"weekends","city":"Pune"}
]'

echo "$READONLY_SEED_VOLS" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",async()=>{const arr=JSON.parse(d);const f=async o=>{const r=await (await fetch("http://localhost:3000/api/profile/upsert",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();console.log("seeded VOL",r.id);};for(const o of arr) await f(o);})'

# Re-run recommendations for original volunteer
if [[ -n "$VOL_ID" ]]; then
  echo '--- refreshed recommend (volunteer -> NGOs) ---'
  curl -sS -X POST http://localhost:3000/api/recommend/ngos \
    -H 'Content-Type: application/json' \
    -d '{"volunteerId":"'"$VOL_ID"'","city":"Pune"}' | sed 's/},{/},\n{/g'
fi

# Re-run recommendations for original NGO
if [[ -n "$NGO_ID" ]]; then
  echo '--- refreshed recommend (NGO -> volunteers) ---'
  curl -sS -X POST http://localhost:3000/api/recommend/volunteers \
    -H 'Content-Type: application/json' \
    -d '{"ngoId":"'"$NGO_ID"'","city":"Pune"}' | sed 's/},{/},\n{/g'
fi

echo '--- tail server.log (last 60 lines) ---'
tail -n 60 server.log || true
