let board_size = 7
let round = true // false: white, true: black
let interval_b
let interval_w
let timer_b = 1
let timer_w = 1

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rander_board(size) {
  let random_char = shuffle(charactors).slice(0, size * size)

  round = true
  $(".turn").html("黑")

  clearInterval(interval_b)
  clearInterval(interval_w)
  timer_b = 1
  timer_w = 1

  $("#second_b").text("00")
  $("#minute_b").text("00")
  $("#second_w").text("00")
  $("#minute_w").text("00")

  $("#checkerboard").html("")
  $("#checkerboard").get(0).style.setProperty("--board-size", size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      $("#checkerboard").append(`
      <div class="cell" data-x=${j} data-y=${i}>${random_char[i * size + j]}</div>
      `)
    }
  }
  $(`.cell:nth-child(-n + ${size})`).addClass("x-coordinate-top")
  $(`.cell:nth-last-child(-n + ${size})`).addClass("x-coordinate-bottom")
  $(".x-coordinate-top").each(function (i) {
    $(this).attr("data-x-coordinate", String.fromCharCode(i + 65))
  })
  $(".x-coordinate-bottom").each(function (i) {
    $(this).attr("data-x-coordinate", String.fromCharCode(i + 65))
  })

  $("[data-x=0]").addClass("y-coordinate-left")
  $(`[data-x=${size - 1}]`).addClass("y-coordinate-right")
  $(".y-coordinate-left").each(function (i) {
    $(this).attr("data-y-coordinate", size - i)
  })
  $(".y-coordinate-right").each(function (i) {
    $(this).attr("data-y-coordinate", size - i)
  })

}


rander_board(7)

function turn_change() {
  round = !round
  round ? $(".turn").html("黑") : $(".turn").html("白")
  round ? startTimer_b() : startTimer_w()
  round ? clearInterval(interval_w) : clearInterval(interval_b)
}

$("body").on("click", ".cell", function () {
  $(".timer_div").css("pointer-events", "none")

  let x = $(this).attr("data-x")
  let y = $(this).attr("data-y")
  $("#checkerboard").append(`<div class="piece"></div>`)
  $(".piece").get(-1).style.setProperty("--x", x)
  $(".piece").get(-1).style.setProperty("--y", y)

  turn_change()

  round ?
    $(".piece").eq(-1).addClass("white") :
    $(".piece").eq(-1).addClass("black")
})

function startTimer_b() {
  let seconds, minutes

  interval_b = setInterval(function () {
    seconds = parseInt(timer_b % 60, 10)
    minutes = parseInt(timer_b / 60, 10)
    seconds = seconds < 10 && seconds >= 0 ? "0" + seconds : seconds
    minutes = minutes < 10 && minutes >= 0 ? "0" + minutes : minutes

    $("#second_b").text(seconds)
    $("#minute_b").text(minutes)

    timer_b++
  }, 1000)
}

function startTimer_w() {
  let seconds, minutes

  interval_w = setInterval(function () {
    seconds = parseInt(timer_w % 60, 10)
    minutes = parseInt(timer_w / 60, 10)
    seconds = seconds < 10 && seconds >= 0 ? "0" + seconds : seconds
    minutes = minutes < 10 && minutes >= 0 ? "0" + minutes : minutes

    $("#second_w").text(seconds)
    $("#minute_w").text(minutes)

    timer_w++
  }, 1000)
}

$("select[name='board_size']").on("change", function () {
  rander_board(this.value)
})

$(".turn_div").on("click", function () {
  $(".timer_div").css("pointer-events", "none")
  turn_change()
})

$(".regret_div").on("click", function () {
  if ($(".piece").get(-1) === undefined) return false
  $(".piece").get(-1).remove()
  turn_change()
})

$(".timer_div").on("click", function () {
  startTimer_b()
  $(this).css("pointer-events", "none")
})

$(".setting_heading").on("click", function () {
  $(".setting_container").slideToggle()
})