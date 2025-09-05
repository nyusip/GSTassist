
import React, { useState, useMemo } from 'react';
import { Trash2, Edit, Upload, Download, Eye } from 'lucide-react';

// Define the type for a GST document
interface GstDocument {
  id: number;
  name: string;
  type: 'GST Return' | 'Invoice' | 'Registration Form';
  returnPeriod: '1 Month' | '3 Months' | 'Yearly';
  file?: File;
}

// Define the type for a personal document
interface PersonalDocument {
  id: number;
  name: string;
  type: 'PAN Card' | 'Company Legal Document' | 'Light Bill';
  file?: File;
}

const DocumentRepositoryPage: React.FC = () => {
  // State for GST documents, form inputs, filter, and search
  const [gstDocuments, setGstDocuments] = useState<GstDocument[]>([]);
  const [gstDocName, setGstDocName] = useState('');
  const [gstDocType, setGstDocType] = useState<'GST Return' | 'Invoice' | 'Registration Form'>('GST Return');
  const [gstReturnPeriod, setGstReturnPeriod] = useState<'1 Month' | '3 Months' | 'Yearly'>('1 Month');
  const [gstDocFile, setGstDocFile] = useState<File | undefined>();
  const [gstFilterPeriod, setGstFilterPeriod] = useState<string>('All');
  const [gstSearchTerm, setGstSearchTerm] = useState<string>('');
  const [editingGstDocument, setEditingGstDocument] = useState<GstDocument | null>(null);

  // State for personal documents, form inputs, filter, and search
  const [personalDocuments, setPersonalDocuments] = useState<PersonalDocument[]>([]);
  const [personalDocName, setPersonalDocName] = useState('');
  const [personalDocType, setPersonalDocType] = useState<'PAN Card' | 'Company Legal Document' | 'Light Bill'>('PAN Card');
  const [personalDocFile, setPersonalDocFile] = useState<File | undefined>();
  const [personalSearchTerm, setPersonalSearchTerm] = useState<string>('');

  // Handle adding a new GST document
  const handleAddGstDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gstDocName.trim()) return; // Basic validation

    const newGstDocument: GstDocument = {
      id: Date.now(),
      name: gstDocName,
      type: gstDocType,
      returnPeriod: gstReturnPeriod,
      file: gstDocFile,
    };

    setGstDocuments([newGstDocument, ...gstDocuments]);

    // Clear form fields
    setGstDocName('');
    setGstDocType('GST Return');
    setGstReturnPeriod('1 Month');
    setGstDocFile(undefined);
  };

  // Handle adding a new personal document
  const handleAddPersonalDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalDocName.trim()) return; // Basic validation

    const newPersonalDocument: PersonalDocument = {
      id: Date.now(),
      name: personalDocName,
      type: personalDocType,
      file: personalDocFile,
    };

    setPersonalDocuments([newPersonalDocument, ...personalDocuments]);

    // Clear form fields
    setPersonalDocName('');
    setPersonalDocType('PAN Card');
    setPersonalDocFile(undefined);
  };

  // Handle deleting a GST document
  const handleDeleteGstDocument = (id: number) => {
    setGstDocuments(gstDocuments.filter(doc => doc.id !== id));
  };

  // Handle deleting a personal document
  const handleDeletePersonalDocument = (id: number) => {
    setPersonalDocuments(personalDocuments.filter(doc => doc.id !== id));
  };
  
  // Handle editing a GST document
  const handleEditGstDocument = (doc: GstDocument) => {
    setEditingGstDocument(doc);
  };

  const handleUpdateGstDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGstDocument) return;

    setGstDocuments(
      gstDocuments.map(doc => (doc.id === editingGstDocument.id ? editingGstDocument : doc))
    );
    setEditingGstDocument(null);
  };

  // Handle viewing a document
  const handleViewDocument = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  // Handle downloading a document
  const handleDownloadDocument = (file: File) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
  };

  // Filter and search logic for GST documents
  const filteredGstDocuments = useMemo(() => {
    return gstDocuments
      .filter(doc => {
        if (gstFilterPeriod === 'All') return true;
        return doc.returnPeriod === gstFilterPeriod;
      })
      .filter(doc => {
        return doc.name.toLowerCase().includes(gstSearchTerm.toLowerCase());
      });
  }, [gstDocuments, gstFilterPeriod, gstSearchTerm]);

  // Filter and search logic for personal documents
  const filteredPersonalDocuments = useMemo(() => {
    return personalDocuments
      .filter(doc => {
        return doc.name.toLowerCase().includes(personalSearchTerm.toLowerCase());
      });
  }, [personalDocuments, personalSearchTerm]);

  const handleExportGst = () => {
    const csvContent = [
      ['Document Name', 'Type', 'Return Period', 'File'],
      ...filteredGstDocuments.map(doc => [
        doc.name,
        doc.type,
        doc.returnPeriod,
        doc.file?.name || 'N/A',
      ]),
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    link.download = 'gst_documents.csv';
    link.click();
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Document Repository</h1>

      {/* GST Document Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">GST Documents</h2>
        <form onSubmit={handleAddGstDocument} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="gstDocName" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Document Name</label>
            <input
              id="gstDocName"
              type="text"
              value={gstDocName}
              onChange={(e) => setGstDocName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., GSTR-3B April"
              required
            />
          </div>
          <div>
            <label htmlFor="gstDocType" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Document Type</label>
            <select
              id="gstDocType"
              value={gstDocType}
              onChange={(e) => setGstDocType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>GST Return</option>
              <option>Invoice</option>
              <option>Registration Form</option>
            </select>
          </div>
          <div>
            <label htmlFor="gstReturnPeriod" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Return Period</label>
            <select
              id="gstReturnPeriod"
              value={gstReturnPeriod}
              onChange={(e) => setGstReturnPeriod(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>1 Month</option>
              <option>3 Months</option>
              <option>Yearly</option>
            </select>
          </div>
          <div>
            <label htmlFor="gstDocFile" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Upload File</label>
            <input
              id="gstDocFile"
              type="file"
              onChange={(e) => setGstDocFile(e.target.files?.[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
          >
            <Upload size={18} className="mr-2" />
            Add Document
          </button>
        </form>

        {/* Filter and Search for GST Documents */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="gstFilterPeriod" className="text-sm font-medium text-gray-600 dark:text-gray-300">Filter by Period:</label>
            <select
              id="gstFilterPeriod"
              value={gstFilterPeriod}
              onChange={(e) => setGstFilterPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="All">All</option>
              <option>1 Month</option>
              <option>3 Months</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={gstSearchTerm}
              onChange={(e) => setGstSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search by document name..."
            />
          </div>
          <button
            onClick={handleExportGst}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export to CSV
          </button>
        </div>

        {/* GST Document List */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Your GST Documents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Document Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Return Period</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">File</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredGstDocuments.length > 0 ? (
                  filteredGstDocuments.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{doc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.returnPeriod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.file?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center gap-4">
                        {doc.file && (
                          <>
                            <button
                              onClick={() => handleViewDocument(doc.file!)}
                              className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 flex items-center"
                            >
                              <Eye size={18} className="mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => handleDownloadDocument(doc.file!)}
                              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-400 flex items-center"
                            >
                              <Download size={18} className="mr-1" />
                              Download
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEditGstDocument(doc)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 flex items-center"
                        >
                          <Edit size={18} className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGstDocument(doc.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 flex items-center"
                        >
                          <Trash2 size={18} className="mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 dark:text-gray-400 py-8">
                      {gstDocuments.length === 0 ? "No GST documents added. Click ‘Add Document’ to start." : "No documents match your filter/search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Personal Document Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Personal Documents</h2>
        <form onSubmit={handleAddPersonalDocument} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="personalDocName" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Document Name</label>
            <input
              id="personalDocName"
              type="text"
              value={personalDocName}
              onChange={(e) => setPersonalDocName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., My PAN Card"
              required
            />
          </div>
          <div>
            <label htmlFor="personalDocType" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Document Type</label>
            <select
              id="personalDocType"
              value={personalDocType}
              onChange={(e) => setPersonalDocType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>PAN Card</option>
              <option>Company Legal Document</option>
              <option>Light Bill</option>
            </select>
          </div>
          <div>
            <label htmlFor="personalDocFile" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Upload File</label>
            <input
              id="personalDocFile"
              type="file"
              onChange={(e) => setPersonalDocFile(e.target.files?.[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
          >
            <Upload size={18} className="mr-2" />
            Add Document
          </button>
        </form>

        {/* Search for Personal Documents */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={personalSearchTerm}
              onChange={(e) => setPersonalSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search by document name..."
            />
          </div>
        </div>

        {/* Personal Document List */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Your Personal Documents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gamma-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Document Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">File</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredPersonalDocuments.length > 0 ? (
                  filteredPersonalDocuments.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{doc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.file?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center gap-4">
                        {doc.file && (
                          <>
                            <button
                              onClick={() => handleViewDocument(doc.file!)}
                              className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 flex items-center"
                            >
                              <Eye size={18} className="mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => handleDownloadDocument(doc.file!)}
                              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-400 flex items-center"
                            >
                              <Download size={18} className="mr-1" />
                              Download
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeletePersonalDocument(doc.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 flex items-center"
                        >
                          <Trash2 size={18} className="mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 dark:text-gray-400 py-8">
                      {personalDocuments.length === 0 ? "No personal documents added. Click ‘Add Document’ to start." : "No documents match your search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal for GST Document */}
      {editingGstDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit GST Document</h2>
            <form onSubmit={handleUpdateGstDocument}>
              <div className="mb-4">
                <label htmlFor="editGstDocName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Name</label>
                <input
                  id="editGstDocName"
                  type="text"
                  value={editingGstDocument.name}
                  onChange={(e) => setEditingGstDocument({ ...editingGstDocument, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editGstDocType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Type</label>
                <select
                  id="editGstDocType"
                  value={editingGstDocument.type}
                  onChange={(e) =>
                    setEditingGstDocument({
                      ...editingGstDocument,
                      type: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>GST Return</option>
                  <option>Invoice</option>
                  <option>Registration Form</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="editGstReturnPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Return Period</label>
                <select
                  id="editGstReturnPeriod"
                  value={editingGstDocument.returnPeriod}
                  onChange={(e) =>
                    setEditingGstDocument({
                      ...editingGstDocument,
                      returnPeriod: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingGstDocument(null)}
                  className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentRepositoryPage;

// Simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);
