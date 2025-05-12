"use client"
import { borderColor, fontColor } from '@/library/constants/colors'
import { Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react'
import React, { useState } from 'react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" })
  }
  return (
    <div>
       {/* Header Section */}
        <div className={`w-full ${borderColor.primary} border-b-[1px] pb-8`}>
          <h1 className={`text-[42px] ${fontColor.primary} font-bold`}>Get in Touch</h1>
          <p className={`text-[18px] ${fontColor.secondry} mt-4 max-w-2xl`}>
            Have a question or want to work together? Fill out the form below and I'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Contact Content */}
        <div className="w-full flex flex-col lg:flex-row gap-10 mt-10">
          {/* Contact Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-[16px] ${fontColor.primary} font-medium mb-2`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${borderColor.primary} border-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-[16px] ${fontColor.primary} font-medium mb-2`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${borderColor.primary} border-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-[16px] ${fontColor.primary} font-medium mb-2`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${borderColor.primary} border-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-[16px] ${fontColor.primary} font-medium mb-2`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg ${borderColor.primary} border-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-600 font-medium"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className={`lg:w-[350px] ${borderColor.primary} border-l-0 lg:border-l-[1px] lg:pl-10 pt-8 lg:pt-0`}>
            <h2 className={`text-[24px] ${fontColor.primary} font-semibold mb-6`}>Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${borderColor.primary} border-[1px]`}>
                  <Mail size={20} className={fontColor.primary} />
                </div>
                <div>
                  <p className={`text-[16px] ${fontColor.primary} font-medium`}>Email</p>
                  <a
                    href="mailto:contact@example.com"
                    className={`text-[16px] ${fontColor.secondry} hover:text-blue-500`}
                  >
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${borderColor.primary} border-[1px]`}>
                  <Phone size={20} className={fontColor.primary} />
                </div>
                <div>
                  <p className={`text-[16px] ${fontColor.primary} font-medium`}>Phone</p>
                  <a href="tel:+1234567890" className={`text-[16px] ${fontColor.secondry} hover:text-blue-500`}>
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${borderColor.primary} border-[1px]`}>
                  <MapPin size={20} className={fontColor.primary} />
                </div>
                <div>
                  <p className={`text-[16px] ${fontColor.primary} font-medium`}>Location</p>
                  <p className={`text-[16px] ${fontColor.secondry}`}>San Francisco, CA, United States</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h3 className={`text-[18px] ${fontColor.primary} font-medium mb-4`}>Connect With Me</h3>

              <div className="flex gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${borderColor.primary} border-[1px] transition-all hover:bg-gray-100`}
                >
                  <Github size={20} className={fontColor.primary} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${borderColor.primary} border-[1px] transition-all hover:bg-gray-100`}
                >
                  <Linkedin size={20} className={fontColor.primary} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${borderColor.primary} border-[1px] transition-all hover:bg-gray-100`}
                >
                  <Twitter size={20} className={fontColor.primary} />
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ContactUs
