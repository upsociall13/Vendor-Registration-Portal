
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Language } from '../types';

interface AdminDashboardProps { lang: Language; }

const data = [
  { name: 'Lucknow', vendors: 450000, credit: 120000 },
  { name: 'Kanpur', vendors: 380000, credit: 95000 },
  { name: 'Varanasi', vendors: 290000, credit: 80000 },
  { name: 'Agra', vendors: 210000, credit: 55000 },
  { name: 'Prayagraj', vendors: 180000, credit: 42000 },
];

const categoryData = [
  { name: 'Street Food', value: 40 },
  { name: 'Kirana/Retail', value: 25 },
  { name: 'Daily Services', value: 20 },
  { name: 'Home Entrepreneurs', value: 15 },
];

const COLORS = ['#F97316', '#10B981', '#3B82F6', '#6366F1'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang }) => {
  const t = {
    en: {
      title: 'State Analytics Portal',
      sub: 'Monitoring economic formalization across Uttar Pradesh.',
      totalVendors: 'Total Vendors: 1.51 Cr',
      creditDisb: 'Credit Disbursed: ₹4,200 Cr',
      chart1: 'Vendor Registration vs Credit Uptake',
      chart2: 'Category Distribution (%)',
      repeat: 'Repeat Borrowers',
      npa: 'NPA Rate'
    },
    hi: {
      title: 'राज्य विश्लेषिकी पोर्टल',
      sub: 'उत्तर प्रदेश में आर्थिक औपचारिकरण की निगरानी।',
      totalVendors: 'कुल विक्रेता: 1.51 करोड़',
      creditDisb: 'वितरित ऋण: ₹4,200 करोड़',
      chart1: 'विक्रेता पंजीकरण बनाम ऋण प्राप्ति',
      chart2: 'श्रेणी वितरण (%)',
      repeat: 'दोबारा उधार लेने वाले',
      npa: 'NPA दर'
    }
  }[lang];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{t.title}</h1>
          <p className="text-slate-500">{t.sub}</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-semibold border border-orange-200 text-xs">
            {t.totalVendors}
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold border border-green-200 text-xs">
            {t.creditDisb}
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-6">{t.chart1}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="vendors" fill="#F97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="credit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-6">{t.chart2}</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
