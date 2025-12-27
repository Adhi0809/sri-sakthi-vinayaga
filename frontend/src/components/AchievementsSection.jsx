import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building2, Quote, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AchievementsSection = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API}/achievements`);
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" data-testid="achievements-section" className="py-24 bg-white">
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
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our Proud Achievers
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our successful students who have completed their training and are now thriving in the mobile repair industry.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-50 rounded-2xl"
          >
            <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              Achievements Coming Soon
            </h3>
            <p className="text-slate-500">
              Our student success stories will be showcased here.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  data-testid={`achievement-card-${achievement.id}`}
                  className="group h-full bg-white border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Photo */}
                    <div className="relative h-48 bg-gradient-to-br from-orange-100 to-blue-50 overflow-hidden">
                      {achievement.photo_url ? (
                        <img
                          src={achievement.photo_url}
                          alt={achievement.student_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <UserCircle2 className="w-24 h-24 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {achievement.course_completed}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {achievement.student_name}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{achievement.completion_date}</span>
                        </div>
                        {achievement.placed_at && (
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>{achievement.placed_at}</span>
                          </div>
                        )}
                      </div>

                      {achievement.testimonial && (
                        <div className="relative">
                          <Quote className="w-6 h-6 text-orange-200 absolute -top-2 -left-1" />
                          <p className="text-slate-600 text-sm italic pl-5 line-clamp-3">
                            {achievement.testimonial}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
