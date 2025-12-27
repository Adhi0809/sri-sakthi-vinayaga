import { Wrench, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Sri Sakthi Vinayaga</h3>
                <p className="text-blue-200 text-sm">Mobile Services & Institute</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your trusted partner for professional mobile repair services and comprehensive training programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-blue-200 hover:text-orange-400 transition-colors text-sm">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-blue-200 hover:text-orange-400 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#achievements" className="text-blue-200 hover:text-orange-400 transition-colors text-sm">
                  Student Achievements
                </a>
              </li>
              <li>
                <a href="#enroll" className="text-blue-200 hover:text-orange-400 transition-colors text-sm">
                  Course Enrollment
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li className="text-blue-200 text-sm">Smartphone Repair</li>
              <li className="text-blue-200 text-sm">Motherboard Repair</li>
              <li className="text-blue-200 text-sm">Software Solutions</li>
              <li className="text-blue-200 text-sm">Training Courses</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>info@srisakthi.com</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                <span>123 Main Street, City Name, State - 600001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-sm">
            © {currentYear} Sri Sakthi Vinayaga Mobile Services. All rights reserved.
          </p>
          <Link
            to="/admin"
            data-testid="admin-link"
            className="text-blue-300 hover:text-orange-400 text-sm transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};
