"use client";
import { useEffect, useState } from "react";
// import "./utils/menuItems";
import AdminHomeView from "@/components/admin-view/home";
import AdminAboutView from "@/components/admin-view/about";
import AdminExperienceView from "@/components/admin-view/experience";
import AdminEducationView from "@/components/admin-view/education";
import AdminProjectView from "@/components/admin-view/project";
import AdminContactView from "@/components/admin-view/contact";
import { addData, getData } from "@/services";
const initialHomeFormData = {
  heading: "",
  summary: "",
};
const initialAboutFormData = {
  aboutme: "",
  noofprojects: "",
  yearofexperience: "",
  noofclients: "",
  skills: "",
};
const initialEducationFormData = {
  degree: "",
  year: "",
  college: "",
};
const initialExperienceFormData = {
  position: "",
  company: "",
  duration: "",
  location: "",
  jobprofile: "",
};
const initialProjectFormData = {
  name: "",
  website: "",
  technologies: "",
  github: "",
};
export default function AdminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("home");
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
  const [aboutViewFormData, setAboutViewFormData] =
    useState(initialAboutFormData);
  const [educationViewFormData, setEducationViewFormData] = useState(
    initialEducationFormData
  );
  const [experienceViewFormData, setExperienceViewFormData] = useState(
    initialExperienceFormData
  );
  const [projectViewFormData, setProjectViewFormData] = useState(
    initialProjectFormData
  );
  const [allData, setAllData] = useState({});

  console.log(process.env.NEXT_PUBLIC_DB_URI);
  const menuItems = [
    {
      id: "home",
      label: "Home",
      component: (
        <AdminHomeView
          formData={homeViewFormData}
          setFormData={setHomeViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: "about",
      label: "About",
      component: (
        <AdminAboutView
          formData={aboutViewFormData}
          setFormData={setAboutViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      component: (
        <AdminExperienceView
          formData={experienceViewFormData}
          setFormData={setExperienceViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      component: (
        <AdminEducationView
          formData={educationViewFormData}
          setFormData={setEducationViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: "project",
      label: "Project",
      component: (
        <AdminProjectView
          formData={projectViewFormData}
          setFormData={setProjectViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      component: <AdminContactView />,
    },
  ];

  async function extractAllDatas() {
    const response = await getData(currentSelectedTab);
    if (
      currentSelectedTab === "home" &&
      response &&
      response.data &&
      response.data.length
    ) {
      setHomeViewFormData(response && response.data[0]);
    }

    if (
      currentSelectedTab === "about" &&
      response &&
      response.data &&
      response.data.length
    ) {
      setAboutViewFormData(response && response.data[0]);
    }
    if (response?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: response && response.data,
      });
    }
  }

  async function handleSaveData() {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      experience: experienceViewFormData,
      education: educationViewFormData,
      project: projectViewFormData,
    };

    const response = await addData(
      currentSelectedTab,
      dataMap[currentSelectedTab]
    );
    console.log(response, "response");

    if (response.success) {
      resetFormData();
      extractAllDatas();
    }
  }

  useEffect(() => {
    extractAllDatas();
  }, [currentSelectedTab]);

  function resetFormData() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setEducationViewFormData(initialEducationFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setProjectViewFormData(initialProjectFormData);
  }

  return (
    <>
      <div className="border-gray-200 border-b">
        <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="p-4 font-bold text-xl text-black"
              onClick={() => {
                setCurrentSelectedTab(item.id);
                resetFormData();
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-10">
          {menuItems.map(
            (item, index) => item.id === currentSelectedTab && item.component
          )}
        </div>
      </div>
    </>
  ); // replace with your admin view component here
}
