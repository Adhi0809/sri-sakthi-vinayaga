import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap, Send, Loader2, Clock, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const EnrollmentSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    course: "",
    message: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (value) => {
    setFormData((prev) => ({ ...prev, course: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.phone || !formData.course) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/enrollments`, formData);
      toast.success("Enrollment submitted successfully! We will contact you soon.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        qualification: "",
        course: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit enrollment. Please try again.");
      console.error("Error submitting enrollment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enroll" data-testid="enrollment-section" className="py-24 bg-gradient-to-br from-blue-900 to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-8"
          >
            <div>
              <span className="inline-block text-orange-400 font-semibold text-sm uppercase tracking-wider mb-3">
                Start Your Journey
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Enroll in Our Professional Courses
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Take the first step towards a successful career in mobile repair technology. 
                Our expert trainers will guide you through comprehensive courses designed 
                for all skill levels.
              </p>
            </div>

            {/* Course Cards */}
            <div className="space-y-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-white mb-1">{course.name}</h4>
                      <p className="text-sm text-blue-200 mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-orange-300">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1 text-blue-300">
                          <Users className="w-4 h-4" />
                          Batch Available
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card data-testid="enrollment-form-card" className="border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <GraduationCap className="w-7 h-7 text-orange-500" />
                  Course Enrollment Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        data-testid="input-full-name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="bg-slate-50 border-slate-200 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        data-testid="input-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-slate-50 border-slate-200 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        data-testid="input-phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-slate-50 border-slate-200 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        name="qualification"
                        data-testid="input-qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="e.g., 12th Pass, Graduate"
                        className="bg-slate-50 border-slate-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      data-testid="input-address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="bg-slate-50 border-slate-200 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Select Course *</Label>
                    <Select
                      value={formData.course}
                      onValueChange={handleCourseChange}
                    >
                      <SelectTrigger
                        data-testid="select-course"
                        className="bg-slate-50 border-slate-200 focus:border-orange-500"
                      >
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.name} ({course.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      data-testid="input-message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any questions or specific requirements?"
                      className="bg-slate-50 border-slate-200 focus:border-orange-500 min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="submit-enrollment-btn"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/25 h-12 text-base font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Enrollment
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
