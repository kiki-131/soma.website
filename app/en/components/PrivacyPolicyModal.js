"use client";
import React from "react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</h3>

        <div className="space-y-6 text-gray-700 text-base">
          <section>
            <h4 className="text-xl font-semibold mb-2">Purpose of Use of Information</h4>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Accepting service registrations and verifying identity</li>
              <li>Managing service usage history</li>
              <li>Processing payments for services</li>
              <li>Analyzing usage behavior to improve our services</li>
              <li>Providing information about our services and promotions</li>
              <li>Responding to inquiries</li>
              <li>Responding to violations of our terms or applicable laws</li>
              <li>Notifying users of changes to or discontinuation of our services</li>
              <li>Notifying users of changes to our terms</li>
              <li>Other purposes related to providing, protecting, and improving our services</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Security Measures</h4>
            <p>
              Specific measures regarding the security management of the information we collect will be provided individually in accordance with applicable laws. Please contact us through our inquiry desk for details.
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Provision of Information to Third Parties</h4>
            <p>We do not provide your personal data to third parties, except in the following cases:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>When outsourcing operations to external contractors</li>
              <li>When information is transferred as part of a business transfer</li>
              <li>When jointly used with partner companies (details will be published separately)</li>
              <li>When permitted by law</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Use of Analytics Tools</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Google Analytics</strong><br />
                Used to collect and analyze user access logs. It uses cookies to gather traffic data, but this data does not include personally identifiable information.
              </li>
              <li>
                <strong>Google Search Console</strong><br />
                Used to analyze our site&apos;s search performance to help improve our services. No personally identifiable information is collected.
              </li>
              <li>
                <strong>Google reCAPTCHA</strong><br />
                Used to prevent unauthorized access and spam. Data collected by this tool is handled in accordance with Google&apos;s Privacy Policy.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Changes to This Privacy Policy</h4>
            <p>We may revise this policy as necessary. Any changes and their effective date will be announced through appropriate means.</p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">Contact</h4>
            <p>
              If you would like to request disclosure, correction, suspension of use, or deletion of your information, please contact us using the details below. Requests will be handled after verifying your identity. Please note that a fee of ¥1,000 applies per disclosure request.
            </p>
            <ul className="list-none pl-0 mt-2">
              <li>Contact: info@soma-jp.net</li>
              <li>Business Name: SOMA Inc.</li>
              <li>Representative: Takuma Naito</li>
              <li>Address: 127-9 Naka-Kibogaoka, Asahi-ku, Yokohama, Kanagawa 241-0825, Japan</li>
            </ul>
          </section>
        </div>

            <div className="mt-6 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-500 to-red-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
