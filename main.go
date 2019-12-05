package main

import (
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strings"

	"github.com/gocolly/colly"
	"github.com/gocolly/colly/queue"
)

// Site is a website descriptor
type Site struct {
	url      string
	selector string
	nextLink string
}

func isURL(test string) bool {
	if _, err := url.ParseRequestURI(test); err != nil {
		return false
	}
	if match, _ := regexp.MatchString("javascript:.*", test); match {
		return false
	}
	return true
}

func scrape(site Site, jokes chan string) {
	c := colly.NewCollector()
	visited := make(map[string]bool)
	q, _ := queue.New(
		2,
		&queue.InMemoryQueueStorage{MaxSize: 10000},
	)

	c.OnHTML(site.selector, func(e *colly.HTMLElement) {
		jokes <- strings.TrimSpace(e.Text)
	})
	c.OnHTML(site.nextLink, func(e *colly.HTMLElement) {
		href := e.Request.AbsoluteURL(e.Attr("href"))
		_, ok := visited[href]
		if isURL(href) && !ok {
			q.AddURL(href)
		}
	})

	c.OnRequest(func(r *colly.Request) {
		visited[r.URL.String()] = true
		fmt.Println("Visiting", r.URL.String())
	})
	c.OnScraped(func(r *colly.Response) {
		if q.IsEmpty() {
			close(jokes)
		}
	})
	q.AddURL(site.url)
	q.Run(c)
	return
}

var configuration = []Site{
	Site{"https://top-funny-jokes.com/offensive-jokes/", ".su-list li", ""},
	Site{"http://www.laughfactory.com/jokes/racist-jokes/", ".joke-text p", ".pagination li a"},
	Site{"http://funnycomedianquotes.com/funny-jimmy-carr-jokes-and-quotes.html?p=1", ".quote", ".pages li a"},
}

func main() {
	jokemap := make(map[string]bool)
	for _, config := range configuration {
		ch := make(chan string)
		go scrape(config, ch)
		for j := range ch {
			jokemap[j] = true
		}
	}
	f, err := os.Create("toxic")
	if err != nil {
		panic(err)
	}
	defer f.Close()
	for j := range jokemap {
		f.WriteString(j)
		f.WriteString("\n%\n")
	}
	fmt.Println("done")
}
