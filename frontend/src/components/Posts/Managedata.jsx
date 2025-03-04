import React, { useEffect, useState } from "react";
import { FileText, Video, BookOpen, Plus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  axios  from 'axios';

const ManageData = () => {
  const navigate = useNavigate();
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;
  const [contentItems, setContentItems] = useState([]);
  useEffect(() => {
    const fetchContentItems = async () => {
      try {
        const response = await axios.get(`${BackendServername}/posts/managecontent/getpost`);
        const data = response.data; 
        console.log(data.data)
        setContentItems(data.data);
      } catch (error) {
        alert(error)
        console.error("Error fetching content items:", error);
      }
    };

    fetchContentItems();
  }, []);
  const [activeFilter, setActiveFilter] = useState("all");

  // Content type metadata
  const contentTypes = [
    {
      type: "Article",
      title: "Articles",
      icon: FileText,
      color: "bg-blue-500",
      badge: "bg-blue-100 text-blue-800",
    },
    {
      type: "video-tutorial",
      title: "Videos",
      icon: Video,
      color: "bg-red-500",
      badge: "bg-red-100 text-red-800",
    },
    {
      type: "StepbyStepGuide",
      title: "Interactive Guides",
      icon: BookOpen,
      color: "bg-green-500",
      badge: "bg-green-100 text-green-800",
    },
    {
      type: "Webinar",
      title: "Webinars",
      icon: Calendar,
      color: "bg-purple-500",
      badge: "bg-purple-100 text-purple-800",
    },
  ];

const categoryDetails = [
    {
      type: "article",
      label: "Articles",
      icon: FileText,
      description: "Rich text, images, embedded media"
    },
    {
      type: "video-tutorial",
      label: "Videos",
      icon: Video,
      description: "Host content with adaptive streaming"
    },
    {
      type: "guide",
      label: "Interactive Guides",
      icon: BookOpen,
      description: "Step-by-step tutorials with interactive elements"
    },
    {
      type: "webinar",
      label: "Webinars",
      icon: Calendar,
      description: "Scheduled live video sessions with chat/Q&A"
    }
  ];

  // Filter content items
  const filteredItems =
    activeFilter === "all"
      ? contentItems
      : contentItems.filter((item) => item.contentData === activeFilter);
console.log(filteredItems)
  // Get type object by type name
  const getTypeInfo = (typeName) => {
    return (
      contentTypes.find((type) => type.type === typeName) || contentTypes[0]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}


      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Content Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryDetails.map((contentType) => (
                <div
                  key={contentType.type}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/create-post/${contentType.type}`)
                  }
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 p-2 rounded-md mr-3">
                      <contentType.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {contentType.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    {contentType.description}
                  </p>
                  <button
                    className="mt-3 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/create-post/${contentType.type}`);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create New
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            Content Management Dashboard
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto opacity-90">
            Manage, update, and organize your content efficiently
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Content Types Section */}
      

        {/* Content Type Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contentTypes.map((type) => {
            const count = contentItems.filter(
              (item) => item.contentData === type.type
            ).length;
            return (
              <div
                key={type.type}
                className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`${type.color} p-4 text-white flex items-center justify-between`}
                >
                  <h3 className="font-semibold">{type.title}</h3>
                  <span className="text-2xl font-bold">{count}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Table Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-4 py-5 bg-gray-50 border-b border-gray-200 flex flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`mr-2 mb-2 px-4 py-2 rounded-md transition-colors ${
                activeFilter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All Content ({contentItems.length})
            </button>
            {contentTypes.map((type) => {
              const count = contentItems.filter(
                (item) => item.contentData === type.type
              ).length;
              return (
                <button
                  key={type.type}
                  onClick={() => setActiveFilter(type.type)}
                  className={`mr-2 mb-2 px-4 py-2 rounded-md transition-colors ${
                    activeFilter === type.type
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {type.title} ({count})
                </button>
              );
            })}
          </div>

          {/* Content table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-center">
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
    {filteredItems.map((item) => (
      <tr key={item.id} className="text-center hover:bg-gray-50">
        <td className="px-6 py-4 text-start">
          <div className="text-sm font-medium text-gray-900">{item.refId?.title}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">{item.refId?.description}</div>
        </td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeInfo(item.contentData).badge}`}>
            {getTypeInfo(item.contentData).title}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{item.author.username}</td>
        <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</td>
        <td className="px-6 py-4 text-sm font-medium space-x-2">
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Edit
          </button>
          <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No content found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageData;