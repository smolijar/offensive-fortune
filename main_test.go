package main

import (
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

func newTestServer(jokesPerPage int, pages int) *httptest.Server {
	mux := http.NewServeMux()
	for i := 1; i <= pages; i++ {
		currentPage := strconv.Itoa(i)
		pagination := ""
		for p := 1; p <= pages; p++ {
			if p != i {
				pagination += `<a href="` + strconv.Itoa(p) + `">prev</a>`
			}
		}
		jokes := ""
		for j := 1; j <= jokesPerPage; j++ {
			jokes += `<p class="joke">Joke mock` + strconv.Itoa(j) + currentPage + `. Haha.</p>`
		}
		mux.HandleFunc("/jokes/page/"+currentPage, func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "text/html")
			w.Write([]byte(`<html>
	<head>
	<title>Jokes page ` + currentPage + `</title>
	</head>
	<body>
	<h1>Hello World</h1>
	<div>` + jokes + `</div>
	<nav>` + pagination + `</nav>
	</body>
	</html>
			`))
		})
	}
	return httptest.NewServer(mux)
}

func TestScrape(t *testing.T) {
	jokesPerPage, pages := 5, 5
	ch := make(chan string)
	ts := newTestServer(jokesPerPage, pages)
	go Scrape(Site{ts.URL + "/jokes/page/1", ".joke", "a"}, ch)
	jokes := []string{}
	for j := range ch {
		jokes = append(jokes, j)
	}

	if len(jokes) != jokesPerPage*pages {
		t.Errorf("Scraped jokes mismatch: expected %d got %d", len(jokes), jokesPerPage*pages)
	}
}
