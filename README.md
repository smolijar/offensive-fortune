<div align="center">

<img src="https://media2.giphy.com/media/sgVb9gX9DpYEo/giphy.gif?cid=790b7611c69dd1c9ed43971d182d9ba2f4aaeed323c7b4fe&rid=giphy.gif" />

# offensive-fortune
[![Does-having-a-dark-sense-of-humor-mean-that-you-are-a-bad-person](https://forthebadge.com/images/badges/no-ragrets.svg)](https://www.quora.com/Does-having-a-dark-sense-of-humor-mean-that-you-are-a-bad-person)
[![gopher](https://forthebadge.com/images/badges/made-with-go.svg)](https://blog.golang.org/gopher)
[![developers](https://forthebadge.com/images/badges/built-by-developers.svg)](https://web.mit.edu/humor/Computers/real.programmers)
[![debt](https://forthebadge.com/images/badges/contains-technical-debt.svg)](https://en.wikipedia.org/wiki/Technical_debt)
[![responsibility](https://forthebadge.com/images/badges/powered-by-responsibility.svg)](https://dictionary.cambridge.org/dictionary/english/responsibility)
[![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)
[![cataas](https://forthebadge.com/images/badges/contains-cat-gifs.svg)](https://cataas.com/)

A script for generating [fortune](https://en.wikipedia.org/wiki/Fortune_(Unix)) cookie from the ugly and horrible jokes internet has to offer.


</div>

```
 _______________________________________
/ These jokes are so dark I'm surprised \
| that they haven't been shot by the    |
\ police.                               /
 ---------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

## Use
1. Run scraper and generate cookie
```bash
make
```
2. Add toxic cookie to your cookie sources
```bash
# move toxic to your fortune directory
# your directory may be different, run `fortune -f` to find it
sudo mv toxic toxic.dat /usr/share/fortune/off
```
3. Run fortune
```bash
fortune -o # run with all offensive cookie files (including others than toxic)
fortune /usr/share/fortune/off/toxic # run only toxic cookie
fortune /usr/share/fortune/off/toxic | cowsay # pipe result to cowsay!
```
## License

This project is licensed under [MIT](./LICENSE).
