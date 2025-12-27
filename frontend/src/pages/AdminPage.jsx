import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  GraduationCap,
  Users,
  Plus,
  Trash2,
  Loader2,
  UserCircle2,
  Calendar,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AdminPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    course_completed: "",
    photo_url: "",
    completion_date: "",
    testimonial: "",
    placed_at: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [achievementsRes, enrollmentsRes, coursesRes] = await Promise.all([
        axios.get(`${API}/achievements`),
        axios.get(`${API}/enrollments`),
        axios.get(`${API}/courses`),
      ]);
      setAchievements(achievementsRes.data);
      setEnrollments(enrollmentsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (value) => {
    setFormData((prev) => ({ ...prev, course_completed: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.student_name || !formData.course_completed || !formData.completion_date) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${API}/achievements`, formData);
      setAchievements((prev) => [response.data, ...prev]);
      toast.success("Achievement added successfully!");
      setFormData({
        student_name: "",
        course_completed: "",
        photo_url: "",
        completion_date: "",
        testimonial: "",
        placed_at: "",
      });
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add achievement");
      console.error("Error adding achievement:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      await axios.delete(`${API}/achievements/${id}`);
      setAchievements((prev) => prev.filter((a) => a.id !== id));
      toast.success("Achievement deleted successfully");
    } catch (error) {
      toast.error("Failed to delete achievement");
      console.error("Error deleting achievement:", error);
    }
  };

  const updateEnrollmentStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/enrollments/${id}/status?status=${status}`);
      setEnrollments((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={styles[status] || styles.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <main data-testid="admin-page" className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Manage student achievements and enrollments
          </p>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="achievements" data-testid="tab-achievements">
              <GraduationCap className="w-4 h-4 mr-2" />
              Achievements ({achievements.length})
            </TabsTrigger>
            <TabsTrigger value="enrollments" data-testid="tab-enrollments">
              <Users className="w-4 h-4 mr-2" />
              Enrollments ({enrollments.length})
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Student Achievements</CardTitle>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      data-testid="add-achievement-btn"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add New Achievement</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="student_name">Student Name *</Label>
                          <Input
                            id="student_name"
                            name="student_name"
                            data-testid="input-student-name"
                            value={formData.student_name}
                            onChange={handleChange}
                            placeholder="Enter student name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="completion_date">Completion Date *</Label>
                          <Input
                            id="completion_date"
                            name="completion_date"
                            data-testid="input-completion-date"
                            value={formData.completion_date}
                            onChange={handleChange}
                            placeholder="e.g., March 2024"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="course_completed">Course Completed *</Label>
                        <Select
                          value={formData.course_completed}
                          onValueChange={handleCourseChange}
                        >
                          <SelectTrigger data-testid="select-course-completed">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.name}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="photo_url">Photo URL</Label>
                        <Input
                          id="photo_url"
                          name="photo_url"
                          data-testid="input-photo-url"
                          value={formData.photo_url}
                          onChange={handleChange}
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="placed_at">Placed At (Company)</Label>
                        <Input
                          id="placed_at"
                          name="placed_at"
                          data-testid="input-placed-at"
                          value={formData.placed_at}
                          onChange={handleChange}
                          placeholder="Company name (optional)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="testimonial">Testimonial</Label>
                        <Textarea
                          id="testimonial"
                          name="testimonial"
                          data-testid="input-testimonial"
                          value={formData.testimonial}
                          onChange={handleChange}
                          placeholder="Student's feedback or testimonial"
                          rows={3}
                        />
                      </div>

                      <Button
                        type="submit"
                        data-testid="submit-achievement-btn"
                        disabled={submitting}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Achievement"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No achievements yet. Add your first one!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-40 bg-gradient-to-br from-orange-100 to-blue-50">
                          {achievement.photo_url ? (
                            <img
                              src={achievement.photo_url}
                              alt={achievement.student_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <UserCircle2 className="w-16 h-16 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-slate-900">
                            {achievement.student_name}
                          </h4>
                          <p className="text-sm text-orange-600 mb-2">
                            {achievement.course_completed}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {achievement.completion_date}
                            </span>
                            {achievement.placed_at && (
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {achievement.placed_at}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          data-testid={`delete-achievement-${achievement.id}`}
                          onClick={() => handleDelete(achievement.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments">
            <Card>
              <CardHeader>
                <CardTitle>Course Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                {enrollments.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No enrollments yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">
                            Contact
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">
                            Course
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.map((enrollment) => (
                          <tr
                            key={enrollment.id}
                            data-testid={`enrollment-row-${enrollment.id}`}
                            className="border-b hover:bg-slate-50"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-slate-900">
                                  {enrollment.full_name}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {enrollment.qualification || "N/A"}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-sm text-slate-700">
                                  {enrollment.email}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {enrollment.phone}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-700">
                              {enrollment.course}
                            </td>
                            <td className="py-3 px-4">
                              {getStatusBadge(enrollment.status)}
                            </td>
                            <td className="py-3 px-4">
                              <Select
                                value={enrollment.status}
                                onValueChange={(value) =>
                                  updateEnrollmentStatus(enrollment.id, value)
                                }
                              >
                                <SelectTrigger
                                  data-testid={`status-select-${enrollment.id}`}
                                  className="w-32"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
