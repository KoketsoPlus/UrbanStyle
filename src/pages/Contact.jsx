// src/pages/Contact.jsx
import React from "react";

export default function Contact() {

 const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "aaaf213b-e2a2-4983-9ace-5fa7f5ed6980");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      alert("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      alert(data.message);
      setResult("");
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="4"
              placeholder="Type your message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {result ? result : "Send Message"}
          </button>
        </form>

        {/* Store Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Store Information</h2>
          <p><strong>Address:</strong> 123 Fashion Street, Pretoria, SA</p>
          <p><strong>Phone:</strong> +27 12 345 6789</p>
          <p><strong>Email:</strong> urbanstyle@yourstore.com</p>
          <p><strong>Hours:</strong> Mon–Fri: 9AM–6PM</p>
        </div>
      </div>
    </div>
  );
}
