package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	"example.com/greetings"
)

var t = time.Now()

func main() {
	log.SetPrefix("greetings: ")
	log.SetFlags(0)
	// Get a greeting message and print it.
	message, err := greetings.Hello("mudanyi")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(message)
	fmt.Println(t)
	fmt.Println(t.Second())
	_, month, day := time.Now().Date()
	fmt.Println(month, day)
	week_day := t.Weekday()
	fmt.Println(week_day)

	passcode := db_id_generator("washingtone", "njoroge")
	fmt.Println(passcode)
}

func db_id_generator(fname, sname string) string {
	num1 := len(fname)
	num2 := len(sname)
	result1 := num1 % 2
	result2 := num2 % 2
	var mid_char1, mid_char2 string
	if result1 == 0 || result2 == 0 {
		mid_char1 = string(fname[num1/2])
		mid_char2 = string(sname[num2/2])
		//fmt.Println(mid_char1 + mid_char2)
	} else {
		mid_char1 = string(fname[(num1-1)/2])
		mid_char2 = string(sname[(num2-1)/2])
		//fmt.Println(mid_char1, mid_char2)
	}
	last_char1 := string(fname[num1-1])
	last_char2 := string(sname[num2-1])
	length := strconv.Itoa(len(fname + sname))
	t := strconv.Itoa(time.Now().Second())
	return strings.ToUpper(mid_char1) + strings.ToUpper(mid_char2) + length + t + last_char1 + last_char2
}
