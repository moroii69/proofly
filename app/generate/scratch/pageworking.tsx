"use client";
import { useState } from 'react';
import axios from 'axios';

export default function InvoiceGeneratorPage() {
  const [formData, setFormData] = useState({
    date: '',
    number: '',
    from: '',
    from_address: '',
    to: '',
    ship_to: '',
    name: '',
    unit_cost: '',
    quantity: '',
    logo: '',
    currency: 'USD',
    due_date: '',
    tax: '',
    amount_paid: '',
    locale: 'en-US',
    notes: '',
    apiKey: 'kqkqedmreto8ht4na212ubo3dqudag4oat1of085m7r5cmaclbquo'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_invoice', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setInvoiceUrl(url);
    } catch (err) {
      console.error('Full error:', err);  // Log full error for debugging
      if (axios.isAxiosError(err)) {
        // Try to parse error response
        const errorText = await err.response?.data?.text();
        setError(errorText || err.response?.data?.message || 'An error occurred while generating the invoice');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice Generator</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {invoiceUrl && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <a 
            href={invoiceUrl} 
            download="invoice.pdf"
            className="underline"
          >
            Download Invoice
          </a>
        </div>
      )}

      <form onSubmit={generateInvoice} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Invoice Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">From (Sender Name)</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">From Address</label>
            <input
              type="text"
              name="from_address"
              value={formData.from_address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">To (Recipient Name)</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Shipping Address</label>
            <input
              type="text"
              name="ship_to"
              value={formData.ship_to}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Unit Cost</label>
            <input
              type="number"
              name="unit_cost"
              value={formData.unit_cost}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
              min="1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Logo URL</label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Tax Rate (%)</label>
            <input
              type="number"
              name="tax"
              value={formData.tax}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Amount Paid</label>
            <input
              type="number"
              name="amount_paid"
              value={formData.amount_paid}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block mb-2">Locale</label>
            <select
              name="locale"
              value={formData.locale}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-md text-white ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Generating Invoice...' : 'Generate Invoice'}
        </button>
      </form>
    </div>
  );
}