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
  },
  {
    name: "Greg",
    date: "14-2-2024",
    start_time: "11 am",
    end_time: "1 pm",
    room_id: 35,
    room_name: "A2",
    book_status: "booked",
  },
  {
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    room_id: 36,
    room_name: "A3",
    book_status: "unbooked",
  },
  {
    name: "Zerod",
    date: "10-2-2024",
    start_time: "1 am",
    end_time: "5 pm",
    room_id: 37,
    room_name: "A4",
    book_status: "booked",
  },
  {
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    room_id: 38,
    room_name: "A5",
    book_status: "unbooked",
  },
  {
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    room_id: 39,
    room_name: "A6",
    book_status: "unbooked",
  },
  {
    name: "Jorhg",
    date: "9-2-2024",
    start_time: "2 am",
    end_time: "3 pm",
    room_id: 40,
    room_name: "A7",
    book_status: "booked",
  },
];

let bookedUser = [];

bookingData.map((el) => {
    if(el.book_status === "booked"){
          bookedUser.push(el)
        }
        })


app.get("/", (req, res) => {
  res.send("Welcome To La de Copper 7 star Palace ");
});

app.get("/room", (req, res) => {
  res.send({ "room data": bookingData });
});


app.post("/postRoomNewroom", (req, res) => {
 
  let addroom = bookingData.push(req.body)

  res.status(200).send({"msg":addroom });
});


app.post("/booking", (req, res) => {
  let newBookReq = req.body;
  let count = 0
  console.log(newBookReq)
  let check = bookingData.map((el) => {
    // console.log(el)
    if(el.book_status === "unbooked"){
        // console.log(el)
        // count++
     el = {
            ...el,
            name: newBookReq.name,
            date: newBookReq.date,
            start_time: newBookReq.start_time,
            end_time: newBookReq.end_time,
            book_status: newBookReq.book_status,
          };

          bookedUser.push(el)
          res.send({ msg: el });

    }
   
  });
// if(count==0){
//     res.send({ msg: "No rooms are available for booking" });
// }

});

app.get("/bookedRoomsList", (req, res) => {
  let roomList = bookingData.filter((el) => {
    return el.name !== "";
  });
  res.send({ "All Booked Room ": roomList });
});

app.get("/bookedUsersList", (req, res) => {
//   let userList = bookingData.filter((el) => {
//     return el.name !== "";
//   });
  res.send({ "All Visited Users ": bookedUser });
});

app.listen(4500, () => {
  console.log("port");
});
