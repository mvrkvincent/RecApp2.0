const STATE = {
  123: { _id: 123, content: "This is my first question" },
  124: { _id: 124, content: "This is my first question" },
  125: { _id: 125, content: "This is my first question" },
};

export const fetchQuestions = () => {
  try {
    const res = localStorage.getItem('questions') ? JSON.parse(localStorage.getItem('questions')) : {};
    return res;
  } catch (err) {
      console.log(`${err} - in fetchQuestions`);
  };
};

export const submitQuestion = question => {
  try {
    STATE[question._id] = question;
    localStorage.setItem('questions', JSON.stringify(STATE));
  } catch (err) {
    console.log(`${err} - in submitQuestion`);
  };
};

export const deleteQuestion = (_id) => {
  try {
    delete STATE[_id];
    localStorage.setItem('questions', JSON.stringify(STATE));
  } catch (err) {
      console.log(`${err} - in deleteQuestion`);
  };
};

