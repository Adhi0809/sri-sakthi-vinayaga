import { Button } from "@/components/ui/button";
import { Wrench, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen pt-20 lg:pt-0 flex items-center overflow-hidden circuit-bg"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-blue-50/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Expert Mobile Repair & Training
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Master the Art of{" "}
              <span className="text-orange-600">Mobile Repair</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Professional mobile repair services and comprehensive training courses
              to launch your career in mobile technology. Learn from industry experts
              with hands-on experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                data-testid="hero-enroll-btn"
                onClick={() => scrollToSection("#enroll")}
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 transition-all duration-300 rounded-lg px-8 h-12 text-base font-semibold btn-glow"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Enroll in Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                data-testid="hero-services-btn"
                onClick={() => scrollToSection("#services")}
                variant="outline"
                size="lg"
                className="border-2 border-slate-200 hover:border-orange-200 hover:bg-orange-50 text-slate-700 rounded-lg px-8 h-12 text-base font-semibold transition-all duration-300"
              >
                <Wrench className="w-5 h-5 mr-2" />
                Repair Services
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500">Students Trained</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <p className="text-3xl font-bold text-slate-900">10+</p>
                <p className="text-sm text-slate-500">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-slate-200 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-3xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500">Success Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
              <img
                src="https://images.unsplash.com/photo-1603114595741-e60bf9486e04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHJlcGFpciUyMHRlY2huaWNpYW4lMjBzb2xkZXJpbmd8ZW58MHx8fHwxNzY2ODEyMzczfDA&ixlib=rb-4.1.0&q=85"
                alt="Mobile repair technician at work"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Certified Training</p>
                  <p className="text-sm text-slate-500">Industry-recognized courses</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-8 -right-4 bg-white rounded-xl shadow-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Expert Repairs</p>
                  <p className="text-sm text-slate-500">All brands supported</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
