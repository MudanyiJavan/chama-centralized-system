package data_access

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
	//"github.com/go-sql-driver/mysql" mysql driver
)

type Profile struct {
	Name    string `json:"name"`
	Contact int64  `json:"contact"`
	Email   string `json:"email"`
}

// querying all profiles from the databasee
func Multi_query() ([]Profile, error) {
	database_url := "postgres://postgres:2024Japheth@localhost:5432/postgres"
	conn, err := pgx.Connect(context.Background(), database_url)
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

// querying a single profile function
func Single_query() (string, int64, string, error) {
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	database_url := "postgres://postgres:2024Japheth@localhost:5432/postgres"
	conn, err := pgx.Connect(context.Background(), database_url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var name string
	var contact int64
	var email string
	idToFind := "av12oc18we"
	err = conn.QueryRow(context.Background(), "select name, contact, email from profile_table where id=$1", idToFind).Scan(&name, &contact, &email)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	return name, contact, email, nil

}

// querying a single chama profile using it's id
func Chama_profile() (string, string) {
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	database_url := "postgres://postgres:2024Japheth@localhost:5432/postgres"
	conn, err := pgx.Connect(context.Background(), database_url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var name string
	var admin string
	idToFind := "22345"
	err = conn.QueryRow(context.Background(), "select name, admin from chama_profile_table where chama_id=$1", idToFind).Scan(&name, &admin)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	return name, admin
}
