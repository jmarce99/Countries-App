import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchCountries } from "../../actions";

//IMPORTS COMPONENTS
import Nav from "../nav/Nav";
import imagen from "../../assets/backgroundCountries.jpg";
//IMPORTS STYLES
import styles from "../modules/AddActivity.module.css";

const AddActivity = () => {
  //const [error,setError]=useState({name:"",dificulty:"",duration:"",season:"",countries:[]})
  //DEFINES USESELECTOR AND USEDISPATCH
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  //DEFINES LOCAL STATES
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  //DEFINES LOCAL STATE TO DIFICULTIES
  const [difficultys, setDifficultys] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  //DEFINES LOCAL STATE TO SEASONS
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");

  //DISPATCH GET COUNTRIES
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  //GET DIFFICULTIES AND SEASONS
  useEffect(() => {
    if (!difficultys.length) {
      const findDifficulties = async () => {
        //Difficulty INPUTS
        const difficultyA = await document.getElementById("1");
        const difficultyB = await document.getElementById("2");
        const difficultyC = await document.getElementById("3");
        const difficultyD = await document.getElementById("4");
        const difficultyF = await document.getElementById("5");
        setDifficultys([
          difficultyA,
          difficultyB,
          difficultyC,
          difficultyD,
          difficultyF,
        ]);
      };
      setTimeout(() => {
        findDifficulties();
      }, 10);
    }
    if (!seasons.length) {
      const findSeasons = async () => {
        //Season INPUTS
        const seasonA = await document.getElementById("spring");
        const seasonB = await document.getElementById("summer");
        const seasonC = await document.getElementById("fall");
        const seasonD = await document.getElementById("winter");
        setSeasons([seasonA, seasonB, seasonC, seasonD]);
      };
      setTimeout(() => {
        findSeasons();
      }, 10);
    }
  });

  //FUNCTION HANDLE CHECKBOX
  function handleCheckBox(name, id) {
    const stateValue =
      name === "difficulty" ? selectedDifficulty : selectedSeason;
    const setStateValue =
      name === "difficulty" ? setSelectedDifficulty : setSelectedSeason;
    if (id === stateValue) {
      setStateValue("");
      setForm({ ...form, [name]: "" });
    } else {
      name === "difficulty"
        ? difficultys
            .filter((element) => element.id !== id)
            .map((element) => {
              return (element.checked = false);
            })
        : seasons
            .filter((element) => element.id !== id)
            .map((element) => {
              return (element.checked = false);
            });
      setStateValue(id);
      setForm({ ...form, [name]: id });
    }
  }
  //FUNCTION HANDLE INPUT CHANGE
  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // FUNCTION HANDLE CHANGE COUNTRY
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: [...form.countries, e.target.value],
    });
  }

  // FUNCTION HANDLE BUTTON INPUT COUNTRY
  const handleKeyDown = (e) => {
    const countriesFind = countries.find(
      (country) => country.id === e.target.value.toUpperCase()
    );
    if (e.key === "Enter") {
      if (countriesFind) {
        setForm({...form, countries: [...form.countries, countriesFind.id]})
        alert("Country added to activity");
      } else alert("Country not found");
    }
  };

  //FUNCTION HANDLE FORM SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    if (
      !form.name ||
      !form.difficulty ||
      !form.duration ||
      !form.season ||
      !form.countries.length
    ) {
      alert("You need to fill everything form to create a activity");
    } else {
      let res = await axios.post("http://localhost:3001/activity", form);
      alert("Your activity has been created!");

      console.log(res.data);
    }
  }

  //FUNCTION SEND FORM BUTTON
  function sendForm(e) {
    const sendButton = document.getElementById("sendButton");
    if (sendButton.id === "sendButton") {
      handleSubmit(e);
      return true;
    } else {
      alert("form not send");
      return false;
    }
  }

  //RENDER
  return (
    <div className={styles.container}>
      <img className={styles.countryimg} src={imagen} alt="background-img" />
      <div className={styles.arriba}>
        <Nav />
      </div>
      <div className={styles.abajo}>
        <form onSubmit={handleSubmit} id="activity_form">
          <div className={styles.data}>
            <div className={styles.up}>
              <h2>ADD ACTIVITY</h2>
            </div>
            <div className={styles.down}>
              <div className={styles.izqdata}>
                <div className={styles.izqdata_up}>
                  <h2>Name:</h2>
                  <input type="text" name="name" onChange={handleInputChange} />
                  <h2>Duration:</h2>
                  <input
                    type="text"
                    name="duration"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.izqdata_down}>
                  <div className={styles.izqdata_down_a}>
                    <h2>Difficulty Level:</h2>
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          name="difficulty"
                          id="1"
                          onClick={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Begginer</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="difficulty"
                          id="2"
                          onClick={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Amateur</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="difficulty"
                          id="3"
                          onClick={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Normal</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="difficulty"
                          id="4"
                          onClick={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Professional</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="difficulty"
                          id="5"
                          onClick={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Expert</h3>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.izqdata_down_b}>
                    <h2>Seasons:</h2>
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          id="spring"
                          name="season"
                          onChange={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Spring</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="summer"
                          name="season"
                          onChange={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Summer</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="fall"
                          name="season"
                          onChange={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Fall</h3>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="winter"
                          name="season"
                          onChange={(e) =>
                            handleCheckBox(e.target.name, e.target.id)
                          }
                        />
                        <h3>Winter</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.derdata}>
                <div className={styles.derdata_up}>
                  <h2>Search Countries:</h2>
                  <input type="text" onKeyDown={(e) => handleKeyDown(e)} />
                  <select onChange={handleChange} name="countries">
                    <option value="">SELECT A COUNTRY</option>
                    {countries.map((i) => (
                      <option value={i.name}>{i.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.derdata_down}>
                  <h2>Selected Countries:</h2>
                  {form.countries.map((i) => (
                    <p>{i}</p>
                  ))}
                  <span
                    type="submit"
                    id="sendButton"
                    value="enviar"
                    onClick={(e) => sendForm(e)}
                  >
                    CREATE ACTIVITY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
