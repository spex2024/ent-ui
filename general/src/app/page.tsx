'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, Building2, Users, Recycle, ArrowRight, Leaf, DollarSign, Clock, CheckCircle, Info } from "lucide-react"
import Link from 'next/link'

export default function SPEXLandingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const cards = [
    {
      icon: UtensilsCrossed,
      title: "Vendors / Restaurants",
      description: "Embrace sustainable packaging",
      content: "Join the revolution by offering your delicious meals in our smart, reusable packs. Reduce waste and attract eco-conscious customers.",
      cta: "Partner with Us",
      color: "bg-[#71bc44]"
    },
    {
      icon: Building2,
      title: "Enterprises",
      description: "Sustainable corporate meal",
      content: "Provide your employees with convenient, eco-friendly meal options. Boost morale and reduce your company's environmental impact.",
      cta: "Sign Up Your Company",
      color: "bg-[#71bc44]"
    },
    {
      icon: Users,
      title: "Users / Employees",
      description: "Enjoy guilt-free meals",
      content: "Savor your favorite foods while contributing to a cleaner planet. Easy-to-use app for ordering and returning smart packs.",
      cta: "Get Started",
      color: "bg-[#71bc44]"
    }
  ]

  const whyChooseCards = [
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce single-use plastic waste and minimize your carbon footprint with our reusable smart packs.",
      benefits: [
        "Reusable materials",
        "Carbon-neutral delivery",
        "Supports local recycling programs"
      ]
    },
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "Save money on packaging in the long run while contributing to a sustainable future for our planet.",
      benefits: [
        "Reduced packaging expenses",
        "Lower waste management costs",
        "Flexible plans for businesses of all sizes"
      ]
    },
    {
      icon: Clock,
      title: "Convenient",
      description: "Our easy-to-use web platform seamlessly connects vendors, enterprises, and users for a smooth experience.",
      benefits: [
        "User-friendly web interface",
        "Automated pack tracking",
        "Earn carbon points with each use"
      ]
    }
  ]

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="absolute top-0 right-0 m-4 z-50">
          <Button variant="outline" asChild className="text-[#71bc44] border-white hover:bg-white hover:text-[#71bc44]">
            <Link href="https://admin.spexafrica.app">Admin Login</Link>
          </Button>
        </div>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
                src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541343/hero-1_raxkds.jpg"
                alt="Sustainable food packaging"
                className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#71bc44] to-green-700 opacity-75"></div>
          </div>
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                Smart Pack Exchange
              </h1>
              <p className="text-2xl md:text-3xl font-semibold mb-8 text-white">
                Corporate Meal In Reusable Packs
              </p>
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto"
            >
              Be part of the sustainable food packaging revolution! Together, we can make a difference, one smart pack at a time.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button size="lg" asChild className="bg-white text-[#71bc44] hover:bg-gray-100 transition-colors duration-300">
                <Link href="https://enterprise.spexafrica.app">
                  Join the Revolution <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-[#71bc44] border-white hover:bg-white hover:text-[#71bc44] transition-colors duration-300">
                Learn More <Info className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Recycle className="w-16 h-16 text-white animate-bounce" />
          </motion.div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: -20 }
              }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-[#71bc44] mb-4">
              How SPEX Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SPEX is a meal marketplace that leverages a web platform and app to connect food vendors with enterprises and users seeking sustainable food packaging.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 20 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                      className="h-full transition-all hover:shadow-xl"
                      onMouseEnter={() => setHoveredCard(card.title)}
                      onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardHeader className={`${card.color} text-white rounded-t-lg`}>
                      <card.icon className="w-12 h-12 mb-4" />
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription className="text-gray-100">{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-6 text-sm text-gray-600">{card.content}</p>
                      <Button
                          variant="outline"
                          asChild
                          className="w-full group text-[#71bc44] border-[#71bc44] hover:bg-[#71bc44] hover:text-white"
                      >
                        <Link href={
                          card.title === "Vendors / Restaurants"
                              ? "https://vendor.spexafrica.app"
                              : card.title === "Enterprises"
                                  ? "https://enterprise.spexafrica.app"
                                  : "https://user.spexafrica.app"
                        }
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                          {card.cta}
                          <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${hoveredCard === card.title ? 'translate-x-1' : ''}`} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>

          <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-20 px-4 md:px-8 lg:px-16"
          >
            <h2 className="text-4xl font-extrabold mb-12 text-[#71bc44] text-center">Why Choose SPEX?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {whyChooseCards.map((item, index) => (
                  <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={controls}
                      variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.5 }
                      }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <Card className="h-full transition-all hover:shadow-xl overflow-hidden group">
                      <CardHeader className="bg-[#71bc44] text-white p-6 transition-all group-hover:bg-[#5a9636]">
                        <div className="flex items-center justify-between mb-4">
                          <item.icon className="w-10 h-10" />
                          <div className="bg-white text-[#71bc44] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardDescription className="text-gray-600 mb-6">{item.description}</CardDescription>
                        <div className="space-y-2">
                          {item.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#71bc44] mr-2" />
                                <p className="text-sm text-gray-600">{benefit}</p>
                              </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <footer className="bg-gray-100 py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} Smart Pack Exchange. All rights reserved.</p>
            <div className="mt-4 space-x-4">
              <Link href="https://user.spexafrica.app" className="text-[#71bc44] hover:underline">User Portal</Link>
              <Link href="https://enterprise.spexafrica.app" className="text-[#71bc44] hover:underline">Enterprise Portal</Link>
              <Link href="https://vendor.spexafrica.app" className="text-[#71bc44] hover:underline">Vendor Portal</Link>
            </div>
          </div>
        </footer>
      </div>
  )
}