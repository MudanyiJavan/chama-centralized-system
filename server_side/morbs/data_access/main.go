package data_access

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	//"github.com/go-sql-driver/mysql" mysql driver
)

type Profile struct {
	Name    string `json:"name"`
	Contact int64  `json:"contact"`
	Email   string `json:"email"`
}

// querying all profiles from the databasee
func Multi_query() ([]Profile, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Printf("Error loading .env file: %v\n", err)
		os.Exit(1)
	}
	db_url := os.Getenv("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), db_url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	rows, err := conn.Query(context.Background(), "select name, contact, email from profile_table")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// An album slice to hold data from returned rows
	var profiles []Profile
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var acc Profile
		if err := rows.Scan(&acc.Name, &acc.Contact, &acc.Email); err != nil {
			return profiles, err
		}
		profiles = append(profiles, acc)
	}
	if err = rows.Err(); err != nil {
		return profiles, err
	}
	return profiles, nil

}

type Chama_Profile struct {
	Name  string `json:"name"`
	Admin string `json:"admin"`
}

func Chama_profiles(user_id string) ([]Chama_Profile, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Printf("Error loading .env file: %v\n", err)
		os.Exit(1)
	}
	databaseURL := os.Getenv("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), databaseURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	rows, err := conn.Query(context.Background(), "select c.name, m.role from chama_profiles c inner join chama_members m on c.chama_id =m.chamaid where m.memberid=$1",
		user_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// An album slice to hold data from returned rows
	var chama []Chama_Profile
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var acc Chama_Profile
		if err := rows.Scan(&acc.Name, &acc.Admin); err != nil {
			return chama, err
		}
		chama = append(chama, acc)
	}
	if err = rows.Err(); err != nil {
		return chama, err
	}
	return chama, nil
}

// querying a single profile function
func Login_Authentication(password string) (string, error) {
	// 1. Load the .env file from the current directory
	err := godotenv.Load()
	if err != nil {
		fmt.Printf("Error loading .env file: %v\n", err)
		os.Exit(1)
	}
	db_url := os.Getenv("DATABASE_URL")

	conn, err := pgx.Connect(context.Background(), db_url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())
	var id string
	err = conn.QueryRow(context.Background(), "select id  from profiles where password=$1", password).Scan(&id)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		return "", err
	}

	return id, nil

}

func Account_creation(fname string, sname string, contact int64, email string, password string) (string, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Printf("Error loading .env file: %v\n", err)
		os.Exit(1)
	}
	databaseURL := os.Getenv("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), databaseURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	//database insertion
	acc_id := db_id_generator(fname, sname)
	name := fname + "" + sname
	err = pgx.BeginFunc(context.Background(), conn, func(tx pgx.Tx) error {
		_, err := tx.Exec(context.Background(), "INSERT INTO profiles (id, name, contact, email, password) VALUES ($1, $2, $3, $4, $5)", acc_id, name, contact, email, password)
		return err
	})
	if row_id := ""; err != nil {
		return row_id, err
	}
	return acc_id, nil
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
