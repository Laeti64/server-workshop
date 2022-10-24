const { application } = require("express");
const Express = require("express");
const checkAllowedQueryParams = require("./utils");
const PORT = 4000;
const app = Express();

const queryWhitelist = ["caractere", "limit"];

app.listen(PORT, (err) => {
  if (err) {
    console.log("something bad happened");
  } else {
    console.log(`app is running on port ${PORT}`);
  }
});

const comments = [
  {
    id: 1,
    name: "Timide",
    comment: "J'ose pas",
    caractere: "gentil",
  },
  {
    id: 2,
    name: "Prof",
    comment: "Ouaich je sais déjà!",
    caractere: "connard",
  },
  {
    id: 3,
    name: "Joyeux",
    comment: "S'trop la fete",
    caractere: "gentil",
  },
  {
    id: 4,
    name: "Grincheux",
    comment: "Va fan culo!",
    caractere: "connard",
  },
  {
    id: 5,
    name: "Atchoum",
    comment: "Atchoum",
    caractere: "gentil",
  },
  {
    id: 6,
    name: "Simplet",
    comment: "Comprends pas...",
    caractere: "gentil",
  },
  {
    id: 7,
    name: "Dormeur",
    comment: "Zzzzzzzzz...",
    caractere: "connard",
  },
];

app.get("/dwarves", (req, res) => {
  console.log(req.query);

  if (!checkAllowedQueryParams(req.query, queryWhitelist)) {
    return res.status(500).json({ message: "Query param not allowed" });
  }

  const limite = req.query.limit;
  const caractere = req.query.caractere;
  console.log(limite, caractere);
  if (limite && caractere) {
    console.log("on y est");
    const result = comments
      .filter((e) => e.caractere === req.query.caractere)
      .slice(0, req.query.limit);
    return res.status(200).json(result);
  }

  if (limite) {
    return res.status(200).json(comments.slice(0, req.query.limit));
  }

  if (caractere) {
    const filtred = comments.filter((e) => e.caractere === req.query.caractere);
    return res.status(200).json(filtred);
  }

  return res.status(200).json(comments);
});

app.get("/dwarves/:id", (req, res) => {
  const dwarfId = req.params.id;
  const specificId = comments.find((e) => +e.id == +dwarfId);

  if (specificId.length != 0) {
    return res.status(200).json(specificId);
  }
});
