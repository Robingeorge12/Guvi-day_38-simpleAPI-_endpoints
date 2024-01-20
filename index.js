const express = require("express");
const app = express();
app.use(express.json());

const room_Data = {
  no_seat_available: 20,
  amenities: ["Ac", "Non_AC", "wifi", "non_wifi", "veg", "non_veg", "both"],
  rate_per_hour: 600,
};

const bookingData = [
  {
    name: "Rob",
    date: "12-2-2024",
    start_time: "10 am",
    end_time: "12 pm",
    room_id: 34,
    room_name: "A1",
    book_status: "booked",
    booking_id: 1,
  },
  {
    name: "Greg",
    date: "14-2-2024",
    start_time: "11 am",
    end_time: "1 pm",
    room_id: 35,
    room_name: "A2",
    book_status: "booked",
    booking_id: 2,
  },
  {
    name: "Greg",
    date: "14-2-2024",
    start_time: "11 am",
    end_time: "1 pm",
    room_id: 35,
    room_name: "A2",
    book_status: "booked",
    booking_id: 3,
  },
  {
    name: "Zerod",
    date: "10-2-2024",
    start_time: "1 am",
    end_time: "5 pm",
    room_id: 37,
    room_name: "A4",
    book_status: "booked",
    booking_id: 5,
  },
  {
    name: "Jorhg",
    date: "9-2-2024",
    start_time: "2 am",
    end_time: "3 pm",
    room_id: 40,
    room_name: "A7",
    book_status: "booked",
    booking_id: 7,
  },
];


app.get("/", (req, res) => {
  res.send("Welcome To La de Copper 7 star Palace ");
});

app.get("/room", (req, res) => {
  res.send({ "room data": bookingData });
});

app.post("/BookRoom", (req, res) => {

  let addroom = bookingData.push(req.body);

  res.status(200).send({ msg: addroom });
});




app.post("/booking", (req, res) => {
  let newBookReq = req.body;

  // console.log(newBookReq.date);

  let isBookingAvailable = bookingData.find((el) => {
    return newBookReq.date === el.date;
  });

  if (isBookingAvailable) {
    res.send({ msg: "User Already Booked With This Date" });
  } else {
    res.send({
      msg: " Booking isAvailable With This Date",
      isBookingAvailable,
    });
  }

  // let unbookedRoom = bookingData.find((el) => el.book_status === "unbooked");
  // if (unbookedRoom) {

  //     unbookedRoom = {
  //       ...unbookedRoom,
  //       name: newBookReq.name,
  //       date: newBookReq.date,
  //       start_time: newBookReq.start_time,
  //       end_time: newBookReq.end_time,
  //       book_status:newBookReq.book_status,
  //       booking_id: newBookReq.booking_id,
  //     };
});

app.get("/bookedRoomsList", (req, res) => {
  let roomList = bookingData.filter((el) => {
    return el.name !== "";
  });
  res.send({ "All Booked Room ": roomList });
});

app.get("/bookedUsersList", (req, res) => {
  let userList = bookingData.filter((el) => {
    return el.name !== "";
  });
  res.send({ "All Visited Users ": userList });
});

app.get("/repeatedUser", (req, res) => {
  let repeatUserCount = {};
  for (let i = 0; i < bookingData.length; i++) {
    let booking = bookingData[i];

    if (booking.book_status === "booked") {
      let key = `${booking.name}_${booking.room_id}_${booking.date}_${booking.start_time}_${booking.end_time},_${booking.room_name}_${booking.book_status}_${booking.booking_id}`;

      console.log(key);

      repeatUserCount[key] = (repeatUserCount[key] || 0) + 1;
    }
  }

  res.send({ "All Booked Room ": repeatUserCount });
});

app.post("/cancelBooking", (req, res) => {
  let newBookReq = req.body;

  console.log(newBookReq);

  

  let indexToRemove = bookingData.findIndex((el) => {
    return newBookReq.name === el.name && el.booking_id === newBookReq.booking_id;
  });

  // If we found, remove the element at the specified index
  if (indexToRemove) {
    bookingData.splice(indexToRemove, 1);

    res.send({ msg: "Booking canceled successfully" });
  } else {
    res.send({
      msg: "Booking not found or already canceled",
    });
  }

  

});


app.listen(4500, () => {
  console.log("port");
});
