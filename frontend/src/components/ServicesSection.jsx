import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Wrench, Cpu, Code, Tablet, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  smartphone: Smartphone,
  wrench: Wrench,
  cpu: Cpu,
  code: Code,
  tablet: Tablet,
  package: Package,
};

export const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const scrollToEnroll = () => {
    const element = document.querySelector("#enroll");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" data-testid="services-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Professional Mobile Repair Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From basic repairs to chip-level motherboard work, we offer comprehensive solutions for all your mobile device needs.
          </p>
        </motion.div>

        {/* Services Grid - Bento Style */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Wrench;
              const isFeatured = service.featured;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={isFeatured ? "md:col-span-1 lg:row-span-1" : ""}
                >
                  <Card
                    data-testid={`service-card-${service.id}`}
                    className={`group h-full border border-slate-100 hover:border-orange-200 transition-all duration-300 overflow-hidden card-hover ${
                      isFeatured ? "bg-gradient-to-br from-orange-50 to-white" : "bg-white"
                    }`}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                          isFeatured
                            ? "bg-orange-500 text-white group-hover:bg-orange-600"
                            : "bg-slate-100 text-slate-600 group-hover:bg-orange-100 group-hover:text-orange-600"
                        }`}
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {service.name}
                      </h3>

                      <p className="text-slate-600 mb-6 flex-grow">
                        {service.description}
                      </p>

                      <Button
                        data-testid={`service-quote-btn-${service.id}`}
                        onClick={scrollToEnroll}
                        variant="ghost"
                        className="w-fit p-0 h-auto text-orange-600 hover:text-orange-700 hover:bg-transparent font-semibold group/btn"
                      >
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
