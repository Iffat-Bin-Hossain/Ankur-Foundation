'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Leaf, Users, Award, Camera, DollarSign, FileText, Mail, Phone, MapPin, Facebook, Linkedin, Twitter, ExternalLink, LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition" onClick={() => router.push('/')}>
            <Image
              src="/logo.png"
              alt="Ankur Foundation Logo"
              width={45}
              height={45}
              className="rounded-full object-cover"
              priority
            />
            <div>
              <div className="text-xl font-bold text-green-700">Ankur</div>
              <div className="text-xs text-gray-500">Foundation</div>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium items-center">
            <a href="#profile" className="text-gray-700 hover:text-green-700 transition">Profile</a>
            <a href="#mission" className="text-gray-700 hover:text-green-700 transition">Mission</a>
            <a href="#projects" className="text-gray-700 hover:text-green-700 transition">Projects</a>
            <a href="#gallery" className="text-gray-700 hover:text-green-700 transition">Gallery</a>
            <a href="#donate" className="text-gray-700 hover:text-green-700 transition">Donate</a>
            <a href="#contact" className="text-gray-700 hover:text-green-700 transition">Contact</a>
            <div className="h-6 w-px bg-gray-300"></div>
            <Button
              onClick={() => router.push('/login')}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 h-9"
              size="sm"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
            <Button
              onClick={() => router.push('/signup')}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 h-9"
              size="sm"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="Ankur Foundation Logo"
              width={128}
              height={128}
              className="rounded-full object-cover shadow-lg"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Ankur Foundation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Building sustainable communities through education, environment, and empowerment
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700">Donate Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        
        {/* 1. Foundation Profile Section */}
        <section id="profile" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Heart className="w-10 h-10 text-green-600" />
            Foundation Profile
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    <strong>Ankur Foundation</strong>, part of Ankur International, was established on <strong>March 28, 2007</strong>, with the primary mission of extending a helping hand to underprivileged communities both locally and internationally. Our journey began with a commitment to provide essential services to the people of Bangladesh during critical times.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We are dedicated to building a healthy and beautiful world together. Through our work, we focus on three main pillars: providing emergency relief during natural disasters, empowering vulnerable populations through training and skill development, and ensuring access to health and education services for disadvantaged communities nationwide and internationally.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">📊 Our Focus Areas</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>★ Natural Disaster Relief (Floods, Droughts & Emergencies)</li>
                      <li>★ Skill Development & Empowerment Training</li>
                      <li>★ Health & Education Services</li>
                      <li>★ Relief Materials & Winter Clothing Distribution</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-700 mb-2">👥 Beneficiaries We Serve</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Persons with Physical Disabilities</li>
                      <li>• Orphaned & Vulnerable Children</li>
                      <li>• Women & Girls</li>
                      <li>• Disaster-Affected Communities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Mission & Vision Section */}
        <section id="mission" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Award className="w-10 h-10 text-blue-600" />
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-700">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 leading-relaxed">
                  To provide immediate and sustained assistance to underprivileged communities during natural disasters and critical times. We empower vulnerable populations—including persons with disabilities, orphaned children, and women—through skill development and training programs. We ensure access to essential health and education services both nationally and internationally.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-700">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 leading-relaxed">
                  To build a healthy and beautiful world where every individual, regardless of their circumstances, has access to essential services, opportunities for self-reliance, and protection during times of crisis. We envision compassionate communities working together to create lasting positive change and support for the most vulnerable members of society.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Users className="w-10 h-10 text-purple-600" />
            Our Projects
          </h2>
          
          <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
              <div className="grid md:grid-cols-1 gap-6">
                {[
                  {
                    title: "Korbani",
                    status: "Active",
                    description: "Supporting communities through meaningful charitable initiatives and resource distribution.",
                    image: "/uploads/photo_2026-01-31_11-28-14 (2).jpg",
                    location: "Bangladesh"
                  },
                  {
                    title: "Ushnota",
                    status: "Active",
                    description: "Providing relief and assistance during extreme weather conditions and emergency situations.",
                    image: "/uploads/photo_2026-01-31_11-28-14 (3).jpg",
                    location: "Bangladesh"
                  },
                  {
                    title: "Medical Project",
                    status: "Active",
                    description: "Delivering healthcare services and medical assistance to underserved communities.",
                    image: "/uploads/photo_2026-01-31_11-28-14.jpg",
                    location: "Bangladesh"
                  },
                  {
                    title: "Project Nilimai",
                    status: "Active",
                    description: "Empowering communities through education, skill development, and sustainable livelihood programs.",
                    image: "/uploads/photo_2026-01-31_11-28-15.jpg",
                    location: "Bangladesh"
                  }
                ].map((project, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center min-h-64">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-sm text-green-600 font-semibold mb-3">{project.status}</p>
                        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "School Building Construction",
                    year: "2022",
                    impact: "3,500+ Students Benefited",
                    description: "Built 5 primary schools with complete infrastructure in remote areas."
                  },
                  {
                    title: "Forest Plantation Drive",
                    year: "2021",
                    impact: "500,000 Trees Planted",
                    description: "Planted half a million trees across 200 hectares in partnership with local communities."
                  },
                  {
                    title: "Skill Development Program",
                    year: "2022",
                    impact: "2,000 Youth Trained",
                    description: "Trained 2,000 youth in IT skills, leading to 85% employment rate."
                  },
                  {
                    title: "Disaster Relief Campaign",
                    year: "2020",
                    impact: "10,000 Families Helped",
                    description: "Provided emergency relief and rehabilitation support to flood-affected communities."
                  }
                ].map((project, idx) => (
                  <Card key={idx} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.year}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{project.description}</p>
                      <div className="bg-green-50 p-3 rounded text-sm font-semibold text-green-700">
                        ✓ {project.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* 4. Gallery Section */}
        <section id="gallery" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Camera className="w-10 h-10 text-pink-600" />
            Gallery
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: "photo", title: "Village Education Center" },
                  { type: "photo", title: "Community Health Camp" },
                  { type: "video", title: "Impact Documentary" },
                  { type: "photo", title: "Water Project Launch" },
                  { type: "photo", title: "Women Training Program" },
                  { type: "video", title: "Success Stories" }
                ].map((item, idx) => (
                  <div key={idx} className="relative group cursor-pointer bg-gray-100 rounded-lg overflow-hidden h-48">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      {item.type === "photo" ? (
                        <Camera className="w-12 h-12 text-gray-400" />
                      ) : (
                        <Heart className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                      <p className="text-white font-semibold text-center px-4">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. Donation Information Section */}
        <section id="donate" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <DollarSign className="w-10 h-10 text-emerald-600" />
            Support Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-emerald-200">
              <CardHeader className="bg-emerald-50">
                <CardTitle>Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-600">
                  Your contribution directly impacts the lives of thousands. Every donation helps us expand our reach and create sustainable change.
                </p>
                <div className="space-y-2">
                  {[
                    { amount: "$10", impact: "Provides notebooks for 1 child" },
                    { amount: "$50", impact: "Funds 1 month healthcare camp" },
                    { amount: "$100", impact: "Plants 500 trees" },
                    { amount: "$500", impact: "Trains 1 youth in skills" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold text-emerald-700">{item.amount}</span>
                      <span className="text-sm text-gray-600">{item.impact}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Donate Online</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle>Annual Reports</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-600">
                  View our comprehensive annual reports showcasing our work, impact, and financial transparency.
                </p>
                <div className="space-y-2">
                  {[
                    { year: "2024", month: "Jan 2024" },
                    { year: "2023", month: "Jan 2023" },
                    { year: "2022", month: "Jan 2022" },
                    { year: "2021", month: "Jan 2021" }
                  ].map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Annual Report {report.year}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. Contact & Footer Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Mail className="w-10 h-10 text-orange-600" />
            Get In Touch
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Office Address</p>
                        <p className="text-gray-600">123 Ankur Road, New Delhi - 110001, India</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Phone</p>
                        <p className="text-gray-600">+91-11-XXXX-XXXX</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Mail className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">Email</p>
                        <p className="text-gray-600">info@ankurfoundation.org</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
                  <p className="text-gray-600 mb-6">Stay updated with our latest projects and initiatives</p>
                  <div className="flex gap-4 mb-8">
                    <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-4">Newsletter</h3>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Button className="bg-orange-600 hover:bg-orange-700">Subscribe</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold">Ankur</span>
              </div>
              <p className="text-gray-400 text-sm">Building sustainable communities through education and empowerment.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#profile" className="hover:text-white transition">About Us</a></li>
                <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
                <li><a href="#donate" className="hover:text-white transition">Donate</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Important</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Report Issues</a></li>
                <li><a href="#" className="hover:text-white transition">Partnerships</a></li>
                <li><a href="#" className="hover:text-white transition">Career</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Ankur Foundation. All rights reserved. Built with ❤️ for social change.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
