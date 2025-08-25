import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200/50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">Mauka</span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md mb-6">
              Creating access, impact and equity—one opportunity at a time. 
              Empowering youth to reach their full potential through education, 
              mentorship, and community support.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-gray-100 hover:bg-violet-100 rounded-lg transition-all duration-200 hover:scale-110 group">
                <Twitter className="w-4 h-4 text-gray-600 group-hover:text-violet-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-violet-100 rounded-lg transition-all duration-200 hover:scale-110 group">
                <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-violet-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-violet-100 rounded-lg transition-all duration-200 hover:scale-110 group">
                <Github className="w-4 h-4 text-gray-600 group-hover:text-violet-600" />
              </a>
              <a href="#" className="p-2 bg-gray-100 hover:bg-violet-100 rounded-lg transition-all duration-200 hover:scale-110 group">
                <Mail className="w-4 h-4 text-gray-600 group-hover:text-violet-600" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">About</a></li>
              <li><a href="#programs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Programs</a></li>
              <li><a href="#impact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Impact</a></li>
              <li><a href="#get-involved" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Get Involved</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Terms</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-200/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2025 Mauka. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with purpose and passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;