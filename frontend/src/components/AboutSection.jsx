import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Certified Experts",
    description: "Our technicians are certified professionals with years of hands-on experience",
  },
  {
    icon: Users,
    title: "500+ Trained Students",
    description: "We've trained over 500 students who are now successful in the industry",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Most repairs completed within 24-48 hours with quality assurance",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work with comprehensive warranty on all repairs",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="py-24 bg-slate-50 circuit-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4143798/pexels-photo-4143798.jpeg"
                alt="Students learning mobile repair"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-semibold">
                  Hands-on Training in Modern Lab
                </p>
                <p className="text-blue-100 text-sm mt-1">
                  State-of-the-art equipment and tools
                </p>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-4 bg-orange-500 text-white rounded-xl p-6 shadow-xl hidden md:block">
              <p className="text-4xl font-bold">10+</p>
              <p className="text-sm opacity-90">Years of Excellence</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Building Skilled Technicians Since 2014
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Sri Sakthi Vinayaga Mobile Services and Institute has been at the forefront 
                of mobile repair training and services. Our comprehensive courses combine 
                theoretical knowledge with extensive practical training, ensuring our 
                students are job-ready from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      data-testid={`about-feature-${index}`}
                      className="border-0 shadow-sm bg-white/80 backdrop-blur hover:shadow-md transition-shadow duration-300"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
