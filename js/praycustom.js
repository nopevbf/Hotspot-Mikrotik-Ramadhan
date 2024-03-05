// Set Jadwal Sholat call PrayTimes.js
$(document).ready(function () {
var date = new Date();
prayTimes.setMethod("MWL"); // Calculation Methods
prayTimes.tune({
imsak: 0,
fajr: 2,
dhuhr: 2,
asr: 2,
maghrib: 2,
isha: 2,
}); // ihtiyati (faktor kehati-hatian) sebesar 2 menit
var times = prayTimes.getTimes(
date,
[-7.481253, 110.213799, 367.78],
7.0
); //  http://www.altitude-maps.com/country/97,Indonesia/
var list = ["Imsak", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
var nama = ["IMSAK", "SUBUH", "DHUHUR", "ASHAR", "MAGHRIB", "ISYA"];
var html = '<div class="waktu-container">';

for (var i in list) {
html += '<div class="waktu">';
html += '<div class="title">' + nama[i] + "</div>";
html +=
'<div class="pukul">' + times[list[i].toLowerCase()] + "</div>";
html += "</div>";
}
html += "</div>";
document.getElementById("waktucontainer").innerHTML = html;
// Set Tanggal dan Jam
var monthNames = [
"Januari",
"Februari",
"Maret",
"April",
"Mei",
"Juni",
"Juli",
"Agustus",
"September",
"Oktober",
"November",
"Desember",
];
var dayNames = [
"Ahad",
"Senin",
"Selasa",
"Rabu",
"Kamis",
"Juma't",
"Sabtu",
];
var newDate = new Date();
newDate.setDate(newDate.getDate());
$("#Date").html(
dayNames[newDate.getDay()] +
", " +
newDate.getDate() +
" " +
monthNames[newDate.getMonth()] +
" " +
newDate.getFullYear()
);
setInterval(function () {
var currentTime = getDateTime();
$("#jam-kanan").html(currentTime);
}, 1000);
});
// Set Calender Hijriah
document.getElementById("tanggal-hijriah").innerHTML =
writeIslamicDate(-1);

// Set Clock
const clockModule = {
getDateTime() {
const e = new Date(),
a = e.getHours(),
t = e.getMinutes(),
o = e.getSeconds();
return (
1 == a.toString().length && (a = "0" + a),
1 == t.toString().length && (t = "0" + t),
1 == o.toString().length && (o = "0" + o),
a + ":" + t + ":" + o
);
},
gmod(e, a) {
return ((e % a) + a) % a;
},
kuwaiticalendar(e) {
const t = new Date();
e &&
((adjustmili = 864e5 * e),
(todaymili = t.getTime() + adjustmili),
(t = new Date(todaymili)));
let day = t.getDate(),
month = t.getMonth(),
year = t.getFullYear(),
m = month + 1,
y = year,
jd,
a,
b,
bb,
cc,
dd,
ee,
wd,
iyear,
epochastro,
epochcivil,
shift1,
z,
cyc,
j,
iy,
im,
id;
m < 3 && (--y, (m += 12)),
(a = Math.floor(y / 100)),
(b = 2 - a + Math.floor(a / 4)),
y < 1583 && (b = 0),
1582 == y &&
(10 < m && (b = -10),
10 == m && ((b = 0), 4 < day && (b = -10))),
(jd =
Math.floor(365.25 * (y + 4716)) +
Math.floor(30.6001 * (m + 1)) +
day +
b -
1524),
(b = 0),
2299160 < jd &&
((a = Math.floor((jd - 1867216.25) / 36524.25)),
(b = 1 + a - Math.floor(a / 4))),
(bb = jd + b + 1524),
(cc = Math.floor((bb - 122.1) / 365.25)),
(dd = Math.floor(365.25 * cc)),
(ee = Math.floor((bb - dd) / 30.6001)),
(day = bb - dd - Math.floor(30.6001 * ee)),
(month = ee - 1),
13 < ee && ((cc += 1), (month = ee - 13)),
(year = cc - 4716),
(wd = e ? this.gmod(jd + 1 - e, 7) + 1 : this.gmod(jd + 1, 7) + 1),
(iyear = 10631 / 30),
(epochastro = 1948084),
(epochcivil = 1948085),
(shift1 = 0.1335),
(z = jd - epochastro),
(cyc = Math.floor(z / 10631)),
(z -= 10631 * cyc),
(j = Math.floor((z - shift1) / iyear)),
(iy = 30 * cyc + j),
(z -= Math.floor(j * iyear + shift1)),
(im = Math.floor((z + 28.5001) / 29.5)),
13 == im && (im = 12),
(id = z - Math.floor(29.5001 * im - 29));
const o = new Array(8);
return (
(o[0] = day),
(o[1] = month - 1),
(o[2] = year),
(o[3] = jd - 1),
(o[4] = wd - 1),
(o[5] = id),
(o[6] = im - 1),
(o[7] = iy),
o
);
},
writeIslamicDate(e) {
const a = [
"Ahad",
"Senin",
"Selasa",
"Rabu",
"Kamis",
"Jum'at",
"Sabtu"
],
t = [
"Muharram",
"Safar",
"Rabi'ul Awwal",
"Rabi'ul Akhir",
"Jumadil Ula",
"Jumadil Akhir",
"Rajab",
"Sya'ban",
"Ramadhan",
"Syawal",
"Dhul Qa'da",
"Dhul Hijjah"
],
o = this.kuwaiticalendar(e);
return a[o[4]] + ", " + o[5] + " " + t[o[6]] + " " + o[7] + " H";
},
time_remaining(e) {
const a = Date.parse(e) - Date.parse(new Date()),
t = Math.floor((a / 1e3) % 60),
o = Math.floor((a / 1e3 / 60) % 60),
r = Math.floor((a / 36e5) % 24);
return {
total: a,
days: Math.floor(a / 864e5),
hours: r,
minutes: o,
seconds: t,
};
},
run_clock(e, a) {
const t = document.getElementById(e),
o = t.querySelector(".clock-day"),
r = t.querySelector(".clock-hours"),
n = t.querySelector(".clock-minutes"),
l = t.querySelector(".clock-seconds");
const c = () => {
const e = this.time_remaining(a);
(o.innerHTML = e.days),
(r.innerHTML = ("0" + e.hours).slice(-2)),
(n.innerHTML = ("0" + e.minutes).slice(-2)),
(l.innerHTML = ("0" + e.seconds).slice(-2)),
e.total <= 0 &&
(clearInterval(i),
(document.querySelector(".clock-day").innerHTML = "D"),
(document.querySelector(".clock-hours").innerHTML = "O"),
(document.querySelector(".clock-minutes").innerHTML = "N"),
(document.querySelector(".clock-seconds").innerHTML = "E"));
};
c();
const i = setInterval(c, 500);
}
};

export default clockModule;
