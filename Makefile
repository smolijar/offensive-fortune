default: run raf
install:
	go install
run: install
	go run main.go
raf: toxic
	strfile toxic
test:
	go test
clean:
	rm -rf toxic toxic.dat
