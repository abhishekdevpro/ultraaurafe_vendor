// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Footer from "../../../footer";
// import CourseHeader from "../header";
// import Select from "react-select";
// import { useSelector } from "react-redux";


// const EditCourse = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const mobileSidebar = useSelector((state) => state.sidebarSlice.expandMenu);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [courseData, setCourseData] = useState({
//     course_title: "",
//     category: "",
//     level: "",
//     course_description: "",
//     course_banner_image: null,
//     course_intro_video: null,
//     requirements: "",
//     course_price: 0,
//     after_discount_price: 0,
//     coupon_code: "",
//     course_language: "",
//     discount_percent: 0,
//     learning_objectives: "",
//     target_audience: "",
//     time_spent_on_course: "",
//   });

//   useEffect(() => {
//     fetchCourseData();
//   }, [id]);

//   const fetchCourseData = async () => {
//     try {
//       const token = localStorage.getItem("trainerToken");
//       const response = await axios.get(`https://api.novajobs.us/api/trainers/course-details/${id}`, {
//         headers: { Authorization: `${token}` },
//       });
//       setCourseData(prev => ({
//         ...prev,
//         ...response.data.data,
//         course_description: response.data.data.course_description || ''
//       }));
//     } catch (error) {
//       console.error("Error fetching course data:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setCourseData({ ...courseData, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (name) => (selectedOption) => {
//     setCourseData({ ...courseData, [name]: selectedOption.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setCourseData({ ...courseData, [e.target.name]: file });
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       for (const key in courseData) {
//         if (courseData[key] !== undefined && courseData[key] !== null) {
//           if (key === "course_banner_image" || key === "course_intro_video") {
//             if (courseData[key] instanceof File) {
//               formData.append(key, courseData[key], courseData[key].name);
//             }
//           } else {
//             formData.append(key, courseData[key]);
//           }
//         }
//       }
//       const token = localStorage.getItem("trainerToken");
//       const response = await axios.patch(`https://api.novajobs.us/api/trainers/update-course/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `${token}`,
//         },
//       });
//       console.log("Course updated successfully:", response.data.data);
//       alert("Course updated successfully!");
//     } catch (error) {
//       console.error("Error updating course:", error);
//       alert("Error updating course. Please try again.");
//     }
//   };

//   const handleAddSection = () => {
//     navigate(`/add-section/${id}`);
//   };

//   const categoryOptions = [
//     { label: "Hardware", value: "Hardware" },
//     { label: "Category 02", value: "Category 02" },
//     { label: "Category 03", value: "Category 03" },
//     { label: "Category 04", value: "Category 04" },
//   ];

//   const levelOptions = [
//     { label: "Beginner", value: "Beginner" },
//     { label: "Level 02", value: "Level 02" },
//     { label: "Level 03", value: "Level 03" },
//     { label: "Level 04", value: "Level 04" },
//   ];

//   const languageOptions = [
//     { label: "English", value: "English" },
//     { label: "Spanish", value: "Spanish" },
//     { label: "French", value: "French" },
//     { label: "German", value: "German" },
//   ];

//   const selectStyle = {
//     menu: (base) => ({ ...base, marginTop: "0px" }),
//     menuList: (base) => ({ ...base, padding: "0" }),
//     option: (provided) => ({
//       ...provided,
//       backgroundColor: mobileSidebar === "disabled" ? "#fff" : "#000",
//       color: mobileSidebar === "disabled" ? "#000" : "#fff",
//       fontSize: "14px",
//       "&:hover": {
//         backgroundColor: mobileSidebar === "disabled" ? "#FFDEDA" : "#2b2838",
//       },
//     }),
//     indicatorSeparator: (base) => ({
//       ...base,
//       display: "none",
//     }),
//     dropdownIndicator: (base, state) => ({
//       ...base,
//       color: "black",
//       transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
//       transition: "250ms",
//       display: "none",
//     }),
//   };

//   return (
//     <div className="main-wrapper">
//       <CourseHeader activeMenu={"EditCourse"} />

//       <section className="page-content course-sec">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-12">
//               <div className="add-course-header">
//                 <h2>Edit Course</h2>
//                 <div className="add-course-btns">
//                   <ul className="nav">
//                     <li>
//                       <Link to="/instructor/instructor-dashboard" className="btn btn-black">
//                         Back to Course
//                       </Link>
//                     </li>
//                     <li>
//                       <button onClick={handleSave} className="btn btn-success-dark">
//                         Save Changes
//                       </button>
//                     </li>
//                     <li>
//                       <button onClick={handleAddSection} className="btn btn-info-dark">
//                         Add Section
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card">
//                 <div className="widget-set">
//                   <div className="widget-setcount">
//                     <ul id="progressbar">
//                       <li className={activeTab === "basic" ? "progress-active" : "progress-activated"}>
//                         <p><span></span> Basic Information</p>
//                       </li>
//                       <li className={activeTab === "media" ? "progress-active" : activeTab === "settings" ? "progress-activated" : ""}>
//                         <p><span></span> Courses Media</p>
//                       </li>
//                       <li className={activeTab === "settings" ? "progress-active" : ""}>
//                         <p><span></span> Settings</p>
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="widget-content multistep-form">
//                     {activeTab === "basic" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Basic Information</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Course Title</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Course Title"
//                                 name="course_title"
//                                 value={courseData.course_title}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Courses Category</label>
//                               <Select
//                                 options={categoryOptions}
//                                 onChange={handleSelectChange("category")}
//                                 value={categoryOptions.find(option => option.value === courseData.category)}
//                                 placeholder="Select Category"
//                                 styles={selectStyle}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Courses Level</label>
//                               <Select
//                                 options={levelOptions}
//                                 onChange={handleSelectChange("level")}
//                                 value={levelOptions.find(option => option.value === courseData.level)}
//                                 placeholder="Select Level"
//                                 styles={selectStyle}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Language</label>
//                               <Select
//                                 options={languageOptions}
//                                 onChange={handleSelectChange("course_language")}
//                                 value={languageOptions.find(option => option.value === courseData.course_language)}
//                                 placeholder="Select Language"
//                                 styles={selectStyle}
//                               />
//                             </div>
//                             <div className="input-block mb-0">
//                               <label className="add-course-label">Course Description</label>
//                               <textarea
//                                 className="form-control"
//                                 name="course_description"
//                                 value={courseData.course_description}
//                                 onChange={handleInputChange}
//                                 rows="4"
//                               ></textarea>
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Learning Objectives</label>
//                               <textarea
//                                 className="form-control"
//                                 name="learning_objectives"
//                                 value={courseData.learning_objectives}
//                                 onChange={handleInputChange}
//                               ></textarea>
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Target Audience</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="target_audience"
//                                 value={courseData.target_audience}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Time Spent on Course</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="time_spent_on_course"
//                                 value={courseData.time_spent_on_course}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link to="#" className="btn btn-info-light next_btn" onClick={() => setActiveTab("media")}>
//                             Continue
//                           </Link>
//                         </div>
//                       </div>
//                     )}

//                     {activeTab === "media" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Courses Media</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Course cover image</label>
//                               <div className="relative-form">
//                                 <span>{courseData.course_banner_image instanceof File ? courseData.course_banner_image.name : "Current image"}</span>
//                                 <label className="relative-file-upload">
//                                   Upload File <input type="file" name="course_banner_image" onChange={handleFileChange} />
//                                 </label>
//                               </div>
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Intro Video (MP4)</label>
//                               <div className="relative-form">
//                                 <span>{courseData.course_intro_video instanceof File ? courseData.course_intro_video.name : "Current video"}</span>
//                                 <label className="relative-file-upload">
//                                   Upload File <input type="file" name="course_intro_video" onChange={handleFileChange} accept=".mp4" />
//                                 </label>
//                               </div>
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("basic")}>Previous</Link>
//                           <Link className="btn btn-info-light next_btn" onClick={() => setActiveTab("settings")}>Continue</Link>
//                         </div>
//                       </div>
//                     )}

//                     {activeTab === "settings" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Course Settings</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Requirements</label>
//                               <textarea
//                                 className="form-control"
//                                 name="requirements"
//                                 value={courseData.requirements}
//                                 onChange={handleInputChange}
//                               ></textarea>
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Price</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="course_price"
//                                 value={courseData.course_price}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Discount Percent</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="discount_percent"
//                                 value={courseData.discount_percent}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Price After Discount</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="after_discount_price"
//                                 value={courseData.after_discount_price}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Coupon Code</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter coupon code"
//                                 name="coupon_code"
//                                 value={courseData.coupon_code}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("media")}>
//                             Previous
//                           </Link>
//                           <Link className="btn btn-info-light next_btn" onClick={handleSave}>
//                             Save Changes
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default EditCourse;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../../footer";
import CourseHeader from "../header";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select, { components } from "react-select";

import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import ReactQuill from "react-quill";
import { debounce } from "lodash";

// Styled components
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ButtonGroup = styled.ul`
  display: flex;
    gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    margin-left: 10px;

    @media (max-width: 768px) {
      margin-left: 0;
      &:nth-child(2) {
        display: none; /* Hide the Save Changes button on smaller screens */
      }
    }
  }

  & > li > a,
  & > li > button {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;

    @media (max-width: 768px) {
      padding: 2px;
      justify-content: center;
      font-size: 8px;

      & > span {
        display: none; /* Hide the text on smaller screens */
      }
    }
  }

  & > li > a > svg,
  & > li > button > svg {
    margin-right: 8px;

    @media (max-width: 768px) {
      margin-right: 0;
    }
  }
`;
const StyledSelect = styled(Select)`
  .select__control {
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    min-height: 44px;
    box-shadow: none;

    &:hover {
      border-color: #b3b3b3;
    }
  }

  .select__indicator-separator {
    display: none;
  }

  .select__dropdown-indicator {
    color: #333;
  }

  .select__menu {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
  }

  .select__option {
    background-color: ${props => props.mobileSidebar === "disabled" ? "#fff" : "#000"};
    color: ${props => props.mobileSidebar === "disabled" ? "#000" : "#fff"};
    font-size: 14px;

    &:hover {
      background-color: ${props => props.mobileSidebar === "disabled" ? "#FFDEDA" : "#2b2838"};
    }
  }
`;

const DropdownIcon = styled(FeatherIcon)`
  width: 18px;
  height: 18px;
`;



// const EditCourse = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const mobileSidebar = useSelector((state) => state.sidebarSlice.expandMenu);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [courseData, setCourseData] = useState({
//     course_title: '',
//     category_id: '',
//     category_name: '',
//     level_id: '',
//     level_name: '',
//     course_description: '',
//     course_banner_image: '',
//     course_intro_video: '',
//     requirements: '',
//     course_price: '',
//     after_discount_price: '',
//     coupon_code: '',
//     course_language: '',
//     discount_percent: '',
//     learning_objectives: '',
//     target_audience: '',
//     time_spent_on_course: '',
//   });
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [levelOptions, setLevelOptions] = useState([]);

//   // useEffect(() => {
//   //   const fetchCourseData = async () => {
//   //     try {
//   //       const token = localStorage.getItem("trainerToken");
//   //       const response = await axios.get(`https://api.novajobs.us/api/trainers/courses/${id}`, {
//   //         headers: {
//   //           Authorization: `${token}`,
//   //         },
//   //       });
//   //       console.log(response,"RDDDD");
//   //       const { data } = response.data;
//   //       console.log(data,"data hu");
//   //       setCourseData({
//   //         course_title: data.course_title,
//   //         category_id: data.course_category_id, // Add this
//   // category_name: data.course_category_name,
//   // level_id: data.course_level_id, // Add this
//   // level_name: data.course_level_name,
//   //         course_description: data.course_description,
//   //         course_banner_image: data.course_banner_image,
//   //         course_intro_video: data.course_intro_video_url,
//   //         requirements: data.requirements,
//   //         course_price: data.course_price,
//   //         after_discount_price: data.after_discount_price,
//   //         coupon_code: data.coupon_code,
//   //         course_language: data.course_language,
//   //         discount_percent: data.discount_percent,
//   //         learning_objectives: data.learning_objectives,
//   //         target_audience: data.target_audience,
//   //         time_spent_on_course: data.time_spent_on_course,
//   //       });
//   //     } catch (error) {
//   //       console.error("Error fetching course data:", error);
//   //       toast.error('Error fetching course data. Please try again.');
//   //       navigate("/instructor/instructor-dashboard");
//   //     }
//   //   };
//   //   console.log(courseData,"haan mai hu");
//   //   const fetchCategoryOptions = async () => {
//   //     try {
//   //       const response = await axios.get('https://api.novajobs.us/api/trainers/course-categories');
//   //       const options = response.data.data.map(category => ({
//   //         value: category.id,
//   //         label: category.name
//   //       }));
//   //       setCategoryOptions(options);
//   //     } catch (error) {
//   //       console.error("Error fetching category options:", error);
//   //       toast.error('Error fetching categories. Please try again.');
//   //     }
//   //   };

//   //   const fetchLevelOptions = async () => {
//   //     try {
//   //       const response = await axios.get('https://api.novajobs.us/api/trainers/course-level');
//   //       const options = response.data.data.map(level => ({
//   //         value: level.id,
//   //         label: level.name
//   //       }));
//   //       setLevelOptions(options);
//   //     } catch (error) {
//   //       console.error("Error fetching level options:", error);
//   //       toast.error('Error fetching levels. Please try again.');
//   //     }
//   //   };

//   //   fetchCourseData();
//   //   fetchCategoryOptions();
//   //   fetchLevelOptions();
//   // }, [id, navigate]);
//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const token = localStorage.getItem("trainerToken");
//         const response = await axios.get(`https://api.novajobs.us/api/trainers/courses/${id}`, {
//           headers: {
//             Authorization: `${token}`,
//           },
//         });
//         const { data } = response.data;
//         console.log(data,"bkl");
//         setCourseData({
//           course_title: data.course_title,
//           category_id: data.course_category_id,
//           category_name: data.course_category_name,
//           level_id: data.course_level_id,
//           level_name: data.course_level_name,
//           course_description: data.course_description,
//           course_banner_image: data.course_banner_image,
//           course_intro_video: data.course_intro_video_url,
//           requirements: data.requirements,
//           course_price: data.course_price,
//           after_discount_price: data.after_discount_price,
//           coupon_code: data.coupon_code,
//           course_language: data.course_language,
//           discount_percent: data.discount_percent,
//           learning_objectives: data.learning_objectives,
//           target_audience: data.target_audience,
//           time_spent_on_course: data.time_spent_on_course,
//         });
//       } catch (error) {
//         console.error("Error fetching course data:", error);
//         toast.error('Error fetching course data. Please try again.');
//         navigate("/instructor/instructor-dashboard");
//       }
//     };

//     const fetchCategoryOptions = async () => {
//       try {
//         const response = await axios.get('https://api.novajobs.us/api/trainers/course-categories');
//         const options = response.data.data.map(category => ({
//           value: category.id,
//           label: category.name
//         }));
//         setCategoryOptions(options);
//       } catch (error) {
//         console.error("Error fetching category options:", error);
//         toast.error('Error fetching categories. Please try again.');
//       }
//     };

//     const fetchLevelOptions = async () => {
//       try {
//         const response = await axios.get('https://api.novajobs.us/api/trainers/course-level');
//         const options = response.data.data.map(level => ({
//           value: level.id,
//           label: level.name
//         }));
//         setLevelOptions(options);
//       } catch (error) {
//         console.error("Error fetching level options:", error);
//         toast.error('Error fetching levels. Please try again.');
//       }
//     };

//     fetchCourseData();
//     fetchCategoryOptions();
//     fetchLevelOptions();
//   }, []);
//   const handleInputChange = ({ target: { name, value } }) => {
//     setCourseData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSelectChange = (name) => (selectedOption) => {
//     setCourseData({ ...courseData, [name]: selectedOption.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setCourseData({ ...courseData, [e.target.name]: file });
//   };

//   const handleQuillChange = (name) => (content) => {
//     setCourseData({ ...courseData, [name]: content });
//   };
//   const handleSave = debounce (async () => {
//     try {
//       const formData = new FormData();
//       for (const key in courseData) {
//         if (courseData[key] !== undefined && courseData[key] !== null) {
//           if (key === "course_banner_image" || key === "course_intro_video") {
//             if (courseData[key] instanceof File) {
//               formData.append(key, courseData[key], courseData[key].name);
//             }
//           } else {
//             formData.append(key, courseData[key]);
//           }
//         }
//       }
//       console.log(formData,"FDDDd");
//       const token = localStorage.getItem("trainerToken");
//       const response = await axios.patch(`https://api.novajobs.us/api/trainers/update-course/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `${token}`,
//         },
//       });
//       console.log("Course updated successfully:", response.data.data);
//       toast.success('Course updated successfully!');
//       navigate("/instructor/instructor-dashboard");
//     } catch (error) {
//       console.error("Error updating course:", error);
//       toast.error('Error updating course. Please try again.');
//     }
//   },500);

//   const handleAddSection = () => {
//     navigate(`/add-section/${id}`);
//   };

//   console.log(courseData,"CD hu");




  

//   const languageOptions = [
//     { label: "English", value: "English" },
//     { label: "Spanish", value: "Spanish" },
//     { label: "French", value: "French" },
//     { label: "German", value: "German" },
//   ];
// const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       minHeight: '44px',
//     }),
//   };

//   const DropdownIndicator = (props) => {
//     return (
//       <components.DropdownIndicator {...props}>
//         <DropdownIcon icon="chevron-down" />
//       </components.DropdownIndicator>
//     );
//   };

//   return (
//     <div className="main-wrapper">
//       <CourseHeader activeMenu={"EditCourse"} />

//       <section className="page-content course-sec">
//         <div className="container">
//         <div className="row align-items-center">
//             <div className="col-md-12">
//             <HeaderWrapper>
//       <Title>Edit Course</Title>
//       <ButtonGroup>
//         <li>
//           <button onClick={handleAddSection} className="btn btn-primary">
//             <FeatherIcon icon="plus-circle" />
//             <span>Add Section</span>
//           </button>
//         </li>
//         <li>
//           <button onClick={handleSave} className="btn btn-success-dark">
//             <FeatherIcon icon="save" />
//             <span>Save Changes</span>
//           </button>
//         </li>
//         <li>
//           <Link to="/instructor/instructor-dashboard" className="btn btn-black">
//             <FeatherIcon icon="arrow-left" />
//             <span>Back to Course</span>
//           </Link>
//         </li>
//       </ButtonGroup>
//     </HeaderWrapper>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="card">
//                 <div className="widget-set">
//                   <div className="widget-setcount">
//                     <ul id="progressbar">
//                       <li className={activeTab === "basic" ? "progress-active" : "progress-activated"}>
//                         <p><span></span> Basic Information</p>
//                       </li>
//                       <li className={activeTab === "media" ? "progress-active" : activeTab === "settings" ? "progress-activated" : ""}>
//                         <p><span></span> Courses Media</p>
//                       </li>
//                       <li className={activeTab === "settings" ? "progress-active" : ""}>
//                         <p><span></span> Settings</p>
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="widget-content multistep-form">
//                     {activeTab === "basic" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Basic Information</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Course Title</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Course Title"
//                                 name="course_title"
//                                 value={courseData.course_title}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Courses Category</label>
//                               <StyledSelect
//                                 options={categoryOptions}
//                                 onChange={handleSelectChange("category")}
//                                 value={categoryOptions.find(option => option.label === courseData.category)}
//                                 placeholder="Select Category"
//                                 styles={customStyles}
//                                 components={{ DropdownIndicator }}
//                                 mobileSidebar={mobileSidebar}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Courses Level</label>
//                               <StyledSelect
//                                 options={levelOptions}
//                                 onChange={handleSelectChange("level")}
//                                 value={levelOptions.find(option => option.value === courseData.level)}
//                                 placeholder="Select Level"
//                                 styles={customStyles}
//                                 components={{ DropdownIndicator }}
//                                 mobileSidebar={mobileSidebar}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Language</label>
//                               <StyledSelect
//                                 options={languageOptions}
//                                 onChange={handleSelectChange("level")}
//                                 value={levelOptions.find(option => option.value === courseData.level)}
//                                 placeholder="Select Level"
//                                 styles={customStyles}
//                                 components={{ DropdownIndicator }}
//                                 mobileSidebar={mobileSidebar}
//                               />
//                             </div>
//                             <div className="input-block mb-0">
//                               <label className="add-course-label">Course Description</label>
//                               <ReactQuill
//                                 value={courseData.course_description}
//                                 onChange={handleQuillChange("course_description")}
//                                 modules={{
//                                   toolbar: [
//                                     [{ header: [1, 2, false] }],
//                                     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                                     [{ list: 'ordered' }, { list: 'bullet' }],
//                                     ['link', 'image'],
//                                     ['clean']
//                                   ],
//                                 }}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Learning Objectives</label>
//                               <ReactQuill
//                                 value={courseData.learning_objectives}
//                                 onChange={handleQuillChange("learning_objectives")}
//                                 modules={{
//                                   toolbar: [
//                                     [{ header: [1, 2, false] }],
//                                     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                                     [{ list: 'ordered' }, { list: 'bullet' }],
//                                     ['link', 'image'],
//                                     ['clean']
//                                   ],
//                                 }}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Target Audience</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="target_audience"
//                                 value={courseData.target_audience}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Time Spent on Course</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="time_spent_on_course"
//                                 value={courseData.time_spent_on_course}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link to="#" className="btn btn-info-light next_btn" onClick={() => setActiveTab("media")}>
//                             Continue
//                           </Link>
//                         </div>
//                       </div>
//                     )}

//                     {activeTab === "media" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Courses Media</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Course cover image</label>
//                               <div className="relative-form">
//                                 <span>{courseData.course_banner_image instanceof File ? courseData.course_banner_image.name : "Current image"}</span>
//                                 <label className="relative-file-upload">
//                                   Upload File <input type="file" name="course_banner_image" onChange={handleFileChange} />
//                                 </label>
//                               </div>
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Intro Video (MP4)</label>
//                               <div className="relative-form">
//                                 <span>{courseData.course_intro_video instanceof File ? courseData.course_intro_video.name : "Current video"}</span>
//                                 <label className="relative-file-upload">
//                                   Upload File <input type="file" name="course_intro_video" onChange={handleFileChange} accept=".mp4" />
//                                 </label>
//                               </div>
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("basic")}>Previous</Link>
//                           <Link className="btn btn-info-light next_btn" onClick={() => setActiveTab("settings")}>Continue</Link>
//                         </div>
//                       </div>
//                     )}

//                     {/* {activeTab === "settings" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Course Settings</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Requirements</label>
//                               <textarea
//                                 className="form-control"
//                                 name="requirements"
//                                 value={courseData.requirements}
//                                 onChange={handleInputChange}
//                               ></textarea>
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Price</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="course_price"
//                                 value={courseData.course_price}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Discount Percent</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="discount_percent"
//                                 value={courseData.discount_percent}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Price After Discount</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="after_discount_price"
//                                 value={courseData.after_discount_price}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Coupon Code</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter coupon code"
//                                 name="coupon_code"
//                                 value={courseData.coupon_code}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("media")}>
//                             Previous
//                           </Link>
//                           <Link className="btn btn-info-light next_btn" onClick={handleSave}>
//                             Save Changes
//                           </Link>
//                         </div>
//                       </div>
//                        )} */}
//                         {activeTab === "settings" && (
//                       <div className="add-course-info">
//                         <div className="add-course-inner-header">
//                           <h4>Course Settings</h4>
//                         </div>
//                         <div className="add-course-form">
//                           <form action="#">
//                             <div className="input-block">
//                               <label className="add-course-label">Requirements</label>
//                               <ReactQuill
//                                 value={courseData.requirements}
//                                 onChange={handleQuillChange("requirements")}
//                                 modules={{
//                                   toolbar: [
//                                     [{ header: [1, 2, false] }],
//                                     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                                     [{ list: 'ordered' }, { list: 'bullet' }],
//                                     ['link', 'image'],
//                                     ['clean']
//                                   ],
//                                 }}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Course Price</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="course_price"
//                                 value={courseData.course_price}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Discount Percent</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="discount_percent"
//                                 value={courseData.discount_percent}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Price After Discount</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="0"
//                                 name="after_discount_price"
//                                 value={courseData.after_discount_price}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                             <div className="input-block">
//                               <label className="add-course-label">Coupon Code</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter coupon code"
//                                 name="coupon_code"
//                                 value={courseData.coupon_code}
//                                 onChange={handleInputChange}
//                               />
//                             </div>
//                           </form>
//                         </div>
//                         <div className="widget-btn">
//                           <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("media")}>
//                             Previous
//                           </Link>
//                           <Link className="btn btn-info-light next_btn" onClick={handleSave}>
//                             Save Changes
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                        </div>
//                      </div>
//                    </div>
//                  </div>

              
//                </div>
//              </div>
//            </section>
     
//            <Footer />
//          </div>
//        );
//      };

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mobileSidebar = useSelector((state) => state.sidebarSlice.expandMenu);
  const [activeTab, setActiveTab] = useState("basic");
  const [courseData, setCourseData] = useState({
    course_title: '',
    course_category_id: '',
    course_category_name: '',
    course_level_id: '',
    course_level_name: '',
    course_description: '',
    course_banner_image: '',
    course_intro_video_url: '',
    requirements: '',
    course_price: '',
    after_discount_price: '',
    coupon_code: '',
    course_language: '',
    discount_percent: '',
    learning_objectives: '',
    target_audience: '',
    time_spent_on_course: '',
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  // const token = localStorage.getItem("trainerToken");
  const token = localStorage.getItem("trainerToken") || localStorage.getItem("vendorToken") || localStorage.getItem("adminToken");

  // Determine user type based on which token is found
  let userType;
  if (localStorage.getItem("trainerToken")) {
    userType = "instructor";
  } else if (localStorage.getItem("vendorToken")) {
    userType = "vendor";
  } else if (localStorage.getItem("adminToken")) {
    userType = "admin";
  }
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`https://api.novajobs.us/api/trainers/courses/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const { data } = response.data;
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error('Error fetching course data. Please try again.');
        navigate(`/${userType}/${userType}-dashboard`);
      }
    };

    const fetchCategoryOptions = async () => {
      try {
        const response = await axios.get('https://api.novajobs.us/api/trainers/course-categories', {
          headers: {
            Authorization: `${token}`,
          },
        });
        const options = response.data.data.map(category => ({
          value: category.id,
          label: category.name
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.error("Error fetching category options:", error);
        toast.error('Error fetching categories. Please try again.');
      }
    };

    const fetchLevelOptions = async () => {
      try {
        const response = await axios.get('https://api.novajobs.us/api/trainers/course-level', {
          headers: {
            Authorization: `${token}`,
          },
        });
        const options = response.data.data.map(level => ({
          value: level.id,
          label: level.name
        }));
        setLevelOptions(options);
      } catch (error) {
        console.error("Error fetching level options:", error);
        toast.error('Error fetching levels. Please try again.');
      }
    };

    fetchCourseData();
    fetchCategoryOptions();
    fetchLevelOptions();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setCourseData(prevState => ({ ...prevState, [name]: selectedOption.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData(prevState => ({ ...prevState, [e.target.name]: file }));
  };

  const handleQuillChange = (name) => (content) => {
    setCourseData(prevState => ({ ...prevState, [name]: content }));
  };

  const handleSave = debounce(async () => {
    try {
      const formData = new FormData();
      for (const key in courseData) {
        if (courseData[key] !== undefined && courseData[key] !== null) {
          if (key === "course_banner_image" || key === "course_intro_video_url") {
            if (courseData[key] instanceof File) {
              formData.append(key, courseData[key], courseData[key].name);
            }
          } else {
            formData.append(key, courseData[key]);
          }
        }
      }

      const response = await axios.patch(`https://api.novajobs.us/api/trainers/update-course/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      console.log("Course updated successfully:", response.data.data);
      toast.success('Course updated successfully!');
      navigate(`/${userType}/${userType}-dashboard`);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error('Error updating course. Please try again.');
    }
  }, 500);

  const handleAddSection = () => {
    navigate(`/add-section/${id}`);
  };

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '44px',
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropdownIcon icon="chevron-down" />
      </components.DropdownIndicator>
    );
  };
  return (
    <div className="main-wrapper">
      <CourseHeader activeMenu={"EditCourse"} />

      <section className="page-content course-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <HeaderWrapper>
                <Title>Edit Course</Title>
                <ButtonGroup>
                  <li>
                    <button onClick={handleAddSection} className="btn btn-primary">
                      <FeatherIcon icon="plus-circle" />
                      <span>Add Section</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={handleSave} className="btn btn-success-dark">
                      <FeatherIcon icon="save" />
                      <span>Save Changes</span>
                    </button>
                  </li>
                  <li>
                    <Link to="/instructor/instructor-dashboard" className="btn btn-black">
                      <FeatherIcon icon="arrow-left" />
                      <span>Back to Course</span>
                    </Link>
                  </li>
                </ButtonGroup>
              </HeaderWrapper>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="widget-set">
                  <div className="widget-setcount">
                    <ul id="progressbar">
                      <li className={activeTab === "basic" ? "progress-active" : "progress-activated"}>
                        <p><span></span> Basic Information</p>
                      </li>
                      <li className={activeTab === "media" ? "progress-active" : activeTab === "settings" ? "progress-activated" : ""}>
                        <p><span></span> Courses Media</p>
                      </li>
                      <li className={activeTab === "settings" ? "progress-active" : ""}>
                        <p><span></span> Settings</p>
                      </li>
                    </ul>
                  </div>

                  <div className="widget-content multistep-form">
                    {/* {activeTab === "basic" && (
                      <div className="add-course-info">
                        <div className="add-course-inner-header">
                          <h4>Basic Information</h4>
                        </div>
                        <div className="add-course-form">
                          <form action="#">
                            <div className="input-block">
                              <label className="add-course-label">Course Title</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Course Title"
                                name="course_title"
                                value={courseData.course_title}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Courses Category</label>
                              <StyledSelect
                                options={categoryOptions}
                                onChange={handleSelectChange("course_category")}
                                value={categoryOptions.find(option => option.value === courseData.course_category_id)}
                                placeholder="Select Category"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                mobileSidebar={mobileSidebar}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Courses Level</label>
                              <StyledSelect
                                options={levelOptions}
                                onChange={handleSelectChange("course_level")}
                                value={levelOptions.find(option => option.value === courseData.course_level_id)}
                                placeholder="Select Level"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                mobileSidebar={mobileSidebar}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Course Language</label>
                              <StyledSelect
                                options={languageOptions}
                                onChange={handleSelectChange("course_language")}
                                value={languageOptions.find(option => option.value === courseData.course_language_id)}
                                placeholder="Select Language"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                mobileSidebar={mobileSidebar}
                              />
                            </div>
                            <div className="input-block mb-0">
                              <label className="add-course-label">Course Description</label>
                              <ReactQuill
                                value={courseData.course_description}
                                onChange={handleQuillChange("course_description")}
                                modules={{
                                  toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                  ],
                                }}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Learning Objectives</label>
                              <ReactQuill
                                value={courseData.learning_objectives}
                                onChange={handleQuillChange("learning_objectives")}
                                modules={{
                                  toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                  ],
                                }}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Target Audience</label>
                              <input
                                type="text"
                                className="form-control"
                                name="target_audience"
                                value={courseData.target_audience}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Time Spent on Course</label>
                              <input
                                type="text"
                                className="form-control"
                                name="time_spent_on_course"
                                value={courseData.time_spent_on_course}
                                onChange={handleInputChange}
                              />
                            </div>
                          </form>
                        </div>
                        <div className="widget-btn">
                          <Link to="#" className="btn btn-info-light next_btn" onClick={() => setActiveTab("media")}>
                            Continue
                          </Link>
                        </div>
                      </div>
                    )} */}
                    {activeTab === "basic" && (
                      <div className="add-course-info">
                        <div className="add-course-inner-header">
                          <h4>Basic Information</h4>
                        </div>
                        <div className="add-course-form">
                          <form action="#">
                            <div className="input-block">
                              <label className="add-course-label">Course Title</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Course Title"
                                name="course_title"
                                value={courseData.course_title}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Courses Category</label>
                              <StyledSelect
                                options={categoryOptions}
                                onChange={handleSelectChange("course_category_id")}
                                value={categoryOptions.find(option => option.value === courseData.course_category_id)}
                                placeholder="Select Category"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                mobileSidebar={mobileSidebar}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Courses Level</label>
                              <StyledSelect
                                options={levelOptions}
                                onChange={handleSelectChange("course_level_id")}
                                value={levelOptions.find(option => option.value === courseData.course_level_id)}
                                placeholder="Select Level"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                mobileSidebar={mobileSidebar}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Course Language</label>
                              <StyledSelect
                                options={languageOptions}
                                onChange={handleSelectChange("course_language")}
                                value={languageOptions.find(option => option.value === courseData.course_language)}
                                placeholder="Select Language"
                                styles={customStyles}
                                components={{ DropdownIndicator }}
                                mobileSidebar={mobileSidebar}
                              />
                            </div>
                            <div className="input-block mb-0">
                              <label className="add-course-label">Course Description</label>
                              <ReactQuill
                                value={courseData.course_description}
                                onChange={handleQuillChange("course_description")}
                                modules={{
                                  toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                  ],
                                }}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Learning Objectives</label>
                              <ReactQuill
                                value={courseData.learning_objectives}
                                onChange={handleQuillChange("learning_objectives")}
                                modules={{
                                  toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                  ],
                                }}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Target Audience</label>
                              <input
                                type="text"
                                className="form-control"
                                name="target_audience"
                                value={courseData.target_audience}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Time Spent on Course</label>
                              <input
                                type="text"
                                className="form-control"
                                name="time_spent_on_course"
                                value={courseData.time_spent_on_course}
                                onChange={handleInputChange}
                              />
                            </div>
                          </form>
                        </div>
                        <div className="widget-btn">
                          <Link to="#" className="btn btn-info-light next_btn" onClick={() => setActiveTab("media")}>
                            Continue
                          </Link>
                        </div>
                      </div>
                    )}


{activeTab === "media" && (
                      <div className="add-course-info">
                        <div className="add-course-inner-header">
                          <h4>Courses Media</h4>
                        </div>
                        <div className="add-course-form">
                          <form action="#">
                            <div className="input-block">
                              <label className="add-course-label">Course cover image</label>
                              <div className="relative-form">
                                <span>{courseData.course_banner_image instanceof File ? courseData.course_banner_image.name : courseData.course_banner_image || "No image selected"}</span>
                                <label className="relative-file-upload">
                                Upload File <input type="file" name="course_banner_image" onChange={handleFileChange} />
                                </label>
                              </div>
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Course Intro Video (MP4)</label>
                              <div className="relative-form">
                                <span>{courseData.course_intro_video_url instanceof File ? courseData.course_intro_video_url.name : courseData.course_intro_video_url || "No video selected"}</span>
                                <label className="relative-file-upload">
                                  Upload File <input type="file" name="course_intro_video_url" onChange={handleFileChange} accept=".mp4" />
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="widget-btn">
                          <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("basic")}>Previous</Link>
                          <Link className="btn btn-info-light next_btn" onClick={() => setActiveTab("settings")}>Continue</Link>
                        </div>
                      </div>
                    )}

                    {activeTab === "settings" && (
                      <div className="add-course-info">
                        <div className="add-course-inner-header">
                          <h4>Course Settings</h4>
                        </div>
                        <div className="add-course-form">
                          <form action="#">
                            <div className="input-block">
                              <label className="add-course-label">Requirements</label>
                              <ReactQuill
                                value={courseData.requirements}
                                onChange={handleQuillChange("requirements")}
                                modules={{
                                  toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                  ],
                                }}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Course Price</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                name="course_price"
                                value={courseData.course_price}
                                onChange={handleInputChange}
                              />
                            </div>
                           {/* {localStorage.getItem('adminToken') &&( <div className="input-block">
                              <label className="add-course-label">Discount Percent</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                name="discount_percent"
                                value={courseData.discount_percent}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Price After Discount</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                name="after_discount_price"
                                value={courseData.after_discount_price}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-block">
                              <label className="add-course-label">Coupon Code</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter coupon code"
                                name="coupon_code"
                                value={courseData.coupon_code}
                                onChange={handleInputChange}
                              />
                            </div>)} */}
                            {localStorage.getItem('adminToken') && (
  <>
    <div className="input-block">
      <label className="add-course-label">Discount Percent</label>
      <input
        type="number"
        className="form-control"
        placeholder="0"
        name="discount_percent"
        value={courseData.discount_percent || ""}
        onChange={handleInputChange}
      />
    </div>
    <div className="input-block">
      <label className="add-course-label">Price After Discount</label>
      <input
        type="number"
        className="form-control"
        placeholder="0"
        name="after_discount_price"
        value={courseData.after_discount_price || ""}
        onChange={handleInputChange}
      />
    </div>
    <div className="input-block">
      <label className="add-course-label">Coupon Code</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter coupon code"
        name="coupon_code"
        value={courseData.coupon_code || ""}
        onChange={handleInputChange}
      />
    </div>
  </>
)}

                          </form>
                        </div>
                        <div className="widget-btn">
                          <Link className="btn btn-black prev_btn" onClick={() => setActiveTab("media")}>
                            Previous
                          </Link>
                          <Link className="btn btn-info-light next_btn" onClick={handleSave}>
                            Save Changes
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EditCourse;