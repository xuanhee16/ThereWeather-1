const { post } = require("../../models")

module.exports = {
    get: async (req, res) => {
        console.log(req.body)
        console.log("여긴 post/location/")

        res.status(210).send({
            positions: [
                {
                    content:
                        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRUYGRgZGhgZHBwYHBwaHBwYGhoaGhgYHBocIS4lHCErIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHzYrJCs0NDQ0NDQ0Nj00NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAJcBTQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAEEQAAEDAgMEBgcHAwIHAQAAAAEAAhEDIQQxQRJRgZEFYXGhsdETIjJSksHwFBVCU2Lh8YKi0gZyI0NEVJOywjP/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAYF/8QAKREAAwABBAMAAQQCAwEAAAAAAAECEQMSITETQVEiBGFxsaHwQoGRMv/aAAwDAQACEQMRAD8A+iMYiNpodJyaYmyIRjEYLrQugLZGIFcBVXdpYxcKxbKGHLocsY7sobgo98IL6yKTA2deUu9ytWqghLmpaypMk2wb6kdiDVh1lK79dfrRJVnnRWmSdUCr4S8pV+GWlRqTYpg4aclTc57EcpmE1pFgiPoyL6rTfg4/ZD2BlCfcvQuwxvuouyCE7o5zSPZO4nyOS9LRw5gxlmj0+jCXhwFiLjSd6Pnx2L4U+jyrmEG+Xb5J7D0pItl8l6KrgmOdZsGYy3aq1Wm1jYa0A6uiAUj10+kOtLHs83iMOSRttv8AWaapYNrBtG8Jmo9sEnTxWDj+kXEwJAVJVVwidVM8snSOOJs0CPFYOIeSToj1CSZKGaa7IhSji1LdsRcxULE65ioaasmc7kT2F3ZTXo1PRo7hdrFdlTZTJprno1sgci+ypso+wuFiORGmgBaqkI5YqliIMgC1ULUxsqOZCGRlQqWoTmpl6E4IlJYu8IDgmntQnNWLyz7VQen6T1lUHJ+kV5do++h9quAgMRmpQloVHqxVSUUYGSqGtC69AeE8rIjZd+ICGawQiAqlo3qilCOiz3tKC4A5IVQ3zQi+FSZEdDL6ds0q6j/KZ27WKlIg5orKFeGAo0yLEJ+nROmcSiU9g21TUbu9JVseZM57dNdyrTw0mYTxYXO3/LgmqdGM7+KDvCMpyKtoOiQLpiiwgesNkaq9SsGjJY3TfS5Y0Bskumepv0UJVW8JBqphZYwcWbuuM87GB1ELLxnSJLSII7ST3rNdjS7+SlHuJ1K7tP8ATJPk471+OCuIxT3WkwlDTJTQYrejXWkl0crzXYkacKjmJ4sVDTRyK5EHU1U00+aao6mjkG0S2FUsTjqaq5i2TYFCxc2EyWLmwjkVyLejXPRpr0au2mtuF2CXoZV3YWBKbc2EtWeVlTfQHEyssSe2EFyO5CcFVHO2AcENzUdwQ3NRHlgHNQixNFqEWrFJo+usACapPWdtuyJBHUi0yvNuT0Ko16ZTLCsunXhMsxY3qbllFSH0NzVVlYHVdL9yVBYF7OtLuaVeviy3NqB94tOg42VpmvhGqn6UeCgy7cmhjWHMK32xgyCqty9CNr6JspuP4ZVKtPe1Hr4raEA2WfUrblSZpk6pI5sHfbthN4VrdXie1Z4eo+puVXDfBPelyegp4um03Itcm3kmKWPa9jnNBgCbwvIQStD7TstDR9SpV+nXrsZa7DY7pVwPqgAdQHjmkh0s8G1u9DeSVQ010RpQlhojWpbechH9JPP7n5JKq9z42jlMDICc0c01wMVZUz0idVVdsWFNEFNHFNFbTTOhUhUU130abFNd9Gk3hwImmquYnzSXPs5Oi28O0zixVNNaZwu9BfSTK0zbDOcxDdTT7qaGWJtwrkSLFXYTwpBR9IaLbjbBLZVXFEeFUtREYB4lBcxNlioaaKZOpEH00J1NaZpobqSdURemZjmIZatF1FBdQKdUhXDEXBULFoDCI1Po4wldygzFPpG45rwTYkK7KhGh71vs6RoTEEf02VnYmgcgOQ+a+T5X7k+14l6ozMPigPaBPNNtqNd7BPYVdlBhdtta0xo64+EZpk1tPRX/AE2S1Ut8IeVSXLAisWm9uKfw+La6xdzyWdXJHtMd2yO9ADnC+xZDYqQfI5Z6OpRkaFZOKwO5Vw1d4IzA7CncS1xE7bT2D5yllOKxkanNznBjOpkLm0VoHBPiY80q+mRmCO1dM2mc9S0Bad4lVcwackfYXfRpsiMU2F0U016NT0aO4XAFtNW2EUMVwxbcYW2F30Sa9GuimtvBgTNNc2E6aar6NbeLgWDERtNHbTTdOm1LWpgaZyKswxKL9mCdZT6lH0d5UHqZZZRwIbAULE3stGYnj5LhqNyDfH5lHezJfWZ1Ru66A9h0C2XOGoA4Jao8Gwnw8E86j+GcL6Y1SmdUEsWs+kTk3kEF+Bec2xwJVVqL2J42+jKeUFzlqPwMb5/2+aPh+ij+EX3mLdmqZ60JAWlTZhRJi1+C0x0C4XkEaEXk7gQtfDdACZPfdbDcKAIyA3WXNq/qscQX0/0uf/o83hugCDL4PUTF/mrv6DcRBDLbgB35lbT6FNt3PA4oNTHU2iASewfMqXm1KeV/Rbw6crDMGv0OGiZAga3lZdTCdq3MXidrJvEme5IPDjqurTqsfkzk1Yj/AIozHYYBUNALQNOUNzGjMhW3kNiAUcOBeJTJB3BcbiGgREjqtPFWGJOlIcZKlTbLQklhDzKjB7TI7QQnaWIo+74FLOxNSILmO6nt2e9AqTmWN/ocI5LlWK7/ALOmm56/o2m4xmmzxslsTi2+63gZWXtgZyOBPgmadPa9ktPUCJ5G62yV7Bvp+iwqg5uKZZXt7R7Lpf0J1Edq6KabEg3UMfaWn2muNtHH5lRuKA9hoaMtCeapTb9FWGzNwh+IfyY1Sx5tLjG6EXEPa8SACeAjzVMNhWO1T9GmG6DthSq5TzPZWZprFGKWQYMcCD4LrWrbe5gkkN5ZpVlVs+yOQF+wJ51s+idaGPYiGK3o1pGdGDthcqtJFwAOoQitUStLBneiXRTTYproppt5PYKhit6NNCkrimldm2MTNJUNNaHolR1JZWBwIhiZoturCmitYtVZNM4DN2d6sGN95CaIyVtveAeAUWn6OiaXtBhSZuChoN3BCFYe74IrawOSVqkVly/hw0G7l1tJoyaOSjqoC4Kk5JG6KJSUqOIysqtpE5mSjhiDXpudkY4rJhYpidkZvHYIJSP2wNPqjnHyT7ujt7u5U+6Qfxd37q81ppcsjU23whM9KPQKmKe7MlajOimg3uO39kR/R7NG96by6SfCB49RrlmAQVUhbL8AwZujilamEpjLaP11qi1ZZOtKkZkyYAldZhy4xIHf+yccxoyaOJlBe/r5J9zfRPal2FZ0Ow5vceQRGdC0hoXdp8kg+rGqE7FHQlI1b9jJ6a9G5S6MY3JjRw+ZRvQNG7uXmjjH6Bx5rhxNb3TyUnpU+6KrVldSAZ0kZPrbQ3EAdwTlPEg3LD9dSzxixnB5NCIcY42Ejs2fJD/oZ/yabcWxv4XDkO5c+1sJy7/2WQXv/C93wg+IQnOeTd89o8inUyI6f+o9Phyx0EOIOutuIVqgdM7ILd7Y74+a82x7xq09kjxCbZjXZf8A0kctPKY6aaw0btHYOYdwKuaIcbTy+YWVTxQbnHP5yj/eYNpt1OASvdngb8R80Y9lx5eF1x1Vzcw/qzCXo46nN3Hi4fJGr4vasHeqdC4H+EqznDC0sZQVuKLhe3bnzTFBjIvBPbBWa2pB9tog+8Ld6tW6RYy93nOQLc9pGsdL/AJT7f8Ak2abx+EFXdBIkLzrunAfYAbw8D+y1cHjNvUfWajaqeSs4rg0YbGQ5IYpibKB8qrnXzKWNXPGQXH7BxZBc1dDgqOq3VJvPQlzwWC6WrjXjdPNFadzQi7wKtPIDYO4qMam9sa2VHAHULeVBej8KCn1q3ohuUAjULpKnWp8Y86a+EFFu4KFoG5VLkCtGpKXybuMjbEukWewHIgLrIGXMpWWau5fwq1NiJ2j9cFRVPWWLiu8DlWpb1XQkHVng+07vVqD2C8ntgRzKmJx4aJAc7ruAirUvCWTOKrl8BmYh2gce1Cq4p40jgsTF9NvNmtA7f3lZr+lKwzP9rfEgqsxu5whKprjJ6U13n8R5wql7+3iPNeTOPqONj8zyCjnVzqR22VdmPhPd/J6R73agpd9U7wFijo6s72nj4gfmiM6GP4nnhCOZXbQrmn6Zp7bfxVGhR1WgBd5d2WWf910xq8nr/ldbhWDIDiQldS+mxphrtB34thsxk9bp+UoDsU8aAdjB4uKua4aPbHYI8kJ3SbR+IcT5JW365KKUu+AFfG1jltdw/8AUJF7qu88yfEput0wPeHAfuk39KN97uCKdL0B7X7Mlj3e8eY8kdlR3vHmEmxh3o7WHeFXySQ2UOsxLx+M80ZmLf7yRAO8Kwcd4Q3S/QcUvZpNxj96KzGv6llCo7e3vVvTu/T3rfi/RstezaZj3bm8h5IjcedWN5D5QsL7U/ezvVhjH/o/uQ2z8D5H9N92LafaZPZI8Cqiqz3COJ/dYf2x+5n9yn3g/czm7yW2fP7G8n3+jYfsHIu7P5VHy4RPOB3rJHST/dZ8R/xVvvJ/uM+MDxatsaBvlmmyg3V4HVDj4BMtxezYHaHH5rEb0g8/8tnxjyXR0g/8ofG3yQqG+xlaXR6IdNOAhoLew+YV2dPvH4ZO8leb+8Kn5I/8jPmgN6SxO0f+AwjQB8OA6zcHkFPwz8G8z+nr2/6gqe4P7vNM4fpas4//AJNI3gHxJXk/vGrEnDVOYI5qU+mnj/kVByS1oJr8UhlrJP8AJnu2Y9x/A7gW+aj+kXszJ7HAeIC8W3/Ub/yq3d5rg/1De9CpPWB5qC/S3Lzj/wALefTaPf4PpAvBtxAKP9qtv4R3aLwLP9SxlRqjsgfNR3+pJyoVT/tAPgUlaGq3ww+TT9nsavSYBIBFt5ELPxHTDxYbJ7DK80emHZ/Za/Fh+YXD0s83GGrfBl3WTz+mx3yK9afRuM6UcDMSc4MwF2p0s4i+yOz+FhfeNQ/9NVk72/UIb8bV1w9X64KnhnPQvl/c2PvB7j6rCfiKK/EVjYgNB3kDley86cfUy+z1O/8AxQ3Yup/2z+Z/xT+L9kDyo9AHOAgPpt7X7R+a67E2g12/0hx+S82cbV/7Z/M/4ILukqo/6c/E7/BHxZ9g8yR6OGal7zvDCPEqeppTcf8Ae4DuC8w7pir+Qfif/ggHpup+T/c7/FOtKvoj1p/1HsRXizWsb2F3yhU9O4atHYB81409PVPyh8R8lR3TdX8pv9yK0WB68ns3Yp3vgcQhVcS451e8/JeOf01W/KHwvVXdMV/yx8L/ADTLRFeuj07yDnVPegPDNXuK8w7pit7jfhd5oDumK3uN5O80yhr2K9VfD07zT/UUF1amPwOPaV5l3TFXVrfhd5oTulqu5vwnzR2/yL5F6SPTPxTPy+ZQXY1vuBecd0nU3N5HzQndI1NzeRWwg7n6welaRuRWvSsgfyu+mA3KCllHSG9tda9KsqTp3I7Kbj/CfGOxM56C7S5tKjqJ1KIzCkifE/simgNNlC8711rvrP5Igwj/AKJHeQmm4CRcnlzjLsRdJAUsV2zoT3ob62u0767E1VwbgCdh3Vdp7robcOSD6jxyHgJTJoVpi3ptdp3FGY50Wn4j4KhYJ1G+dyNTAnZi4k+1luzz1TNgksytFtp2/M8bK7cRlD45jhuVHsdcuHgo0NzgZZzOsaFIx0EfXJvtH660B9cz6xcbZz5lDe6cgNNJjvUFV+Y5Wg2vldNIldlnvBEkG+u/wE5oQe3LaPH5yLIhfb2bxnc24QgOc0n68bwmli0Xbhwb7Q5DmcinsPhifZflvkDrubJRgYTGvXpnmQSY4J7C0p9kQZjO1rZxu5JLopEjmw9otUaDpJg3FoIbbnddY97jDn7Id+LbcZtAF5+pVgHsuTAjOdTeIMg2vPclhUdN3ZToJzjtN9YjSVBPJ0NYGzgnz6hNQdT9euHfVlQ0HSdrbZc3dJHdfXckzWeDe0atkZ6i8+KZZ0q8ficd0kgc5HXmUXkRYLegINntPa8DiZDevJXdhqke04xucXDhB7EdnSk+3s3Fsib7hPn8kV+KY6xYAewtPVABjkSldMdSjOLKgP4gP6o5/WS4XvH43iOsaZxZOPeyRDiM73N9Raw5rjn5gPnS4nfYQD2XWybAua5yLjJ3xPcR9ShPfNjsnP3vG/XZaLGONoYe0AZbhY80KthzmaTbxkevcHG6CZsGW/Zzhg3yMs7myD6S1izgYE/Wi0amHAj/AITv6Yjy3apLE02jRzTG4RxgTr4qs0TpAWv6geIMc0VlX9LPhBSrgy0u5h3gB+65sN0dc6CB2+1CYVDbqv6WH+kfX8pKq4GfUYPhCuaDiLaDeDwsEvW9JGR5IoFAazAcmg8QUi9n6TwnrRaj3Gd03tl4hLPqHyyHeAJVEyNLJVwb+rl3ZqsN/mPNDLyPr5LhqnMouhVJba/V3qrqh9481X0p1JVXVPqyV0UmWjcpFh3lRzGzYnh/Kx2Yi979iO3EkZRxuuZZ+lnj4atGq1uYJGU3snDitBlvP7knuWCzEdav9rO9U2ZYnlwuEbbMQD7R4fQT7KwAEW1N7/svNMxDtPGF37U82Oz8Ud0IVKQZ1H8PSNxLZ0HGbckV+NDY2Wk9jXHwnwWLg2OJlz2gA6AeJPyW7Rcw22iSN21/HJSrgtLbRDinmNlpiMnB3KzZU9I/ZO2wDdslzp7bW5JxtSA0ta5+1PsxzJIAHFCxVRxaPVEgwJIJ/sBDea0vk1IDhwTnYaSIHVEknwVvuwky1wAMgBroBix9qCdckkyQdonLqcUxQxd7wZ/SZjI3myq8+hJ2vsNisO1rYc14cRkDI3EybHshZRpvuNm2YBBAPXYn9+rTYxNX1A1siALbbg0djTYJenhzc7QF7iT3wJ3IJvBmlkrRoNLNpzBItJfbuad6XrP2RFgDaYvBMZ68E1icQ6ANoA7xJIG+xvxSX2hsQ5gMWkE3jIkkeN085wJWMilQNI3aQQR1znEpd40/fx80+ys0El7Afl1CRK7tNM+y3WAwERleTcJ5ZNiNDwyMkHLv7E+wubfaAGt22vre2tiEDEEFsAAnUtAAjgBPbddo05MhzWlukiYyMAqdsrBpMxGy0kua6fxOmY90kjK30VG42W6tBIEAbTjAzLjmNwM5pOpVaw5kAj1g0EmYkSchkLEKUth2TwJzMm+6YJLt2yeYUVg6GONFM2jrLSHCLdU348Cqsw05DaGmyBEXnIi+Q80nVwxYJD2yNAQ4RpkZO+wte5iwKeLc0TftbDjHUbHkSnx8Jt/TS9H6xuZBmxbZuUE5cf1KlSnaA4wDEyQZ7Deb55JduNI0DXbiLAHU7JtqmG4nauZJbbUn/cDYxwKV5CsEcLe04AdZsOFvFVFV8ertR1zMa5Dw6kRlUEgAmBJJgSI6s/LqQw8XhjyCDBDWm2kyL8J7CsYqMaWWs0TrYkjKSSOd1ZuNcRG3BzketnuvkOOaE93qk7LgP6o3bRbA8NepLvqEZbVzGjdkGxsT/cOzPM4NkcqYogA6mSSRG12SJPahvxLiBcyNGxbtkfNLVKgktDmkCZgze8SBnEZRdJPqRIzOt4N9QTvTJCNmoa5j1gY0cNN9gfDJCGKbN2kneLmIzmJWezENmznMIyJ2r235eKC+qHky4HXMgg55ZHVMLkffWZNsu0+1uuDP1ZVL3Ns15ymxy6osknvdoDlpA4EpfbjQ55eqD5cljDdSo+Ln1s5ItbLOQEq+oc9lvK/FBfXAnP8AfKOtUOJNpzJnITbRFUK5yR1Qat4dao57dFx9ff5FDNXeFnRlJ0kIbnj6hdLh9fOEKrFkrY6QRrgDFuSKHFRRIgnWn6MlXLoUUVlwuCVJN8hGvhWD+HiootLy3kS1tlYGadeNStSliyBJM6ja9YC1raqKJrSBpUzRf00WsbJcbzMwZBnRKv6YzLWhpNpABJ3klwJuuKJZ05yNerX0rTx022WnUGLzwhNDpD3hO6PKVFE7lZJq6wdxOPFgJ7NyGMe4iJy3T4qKIpLCA7rLBHEO39tyrtxUZEz9b1FE2FgV00zlfE2uM+wpI4kgTNhpHifJcUSoq28HPtDZkSD1WgjdHiepMsqgm4N4zg3tbP6lRRSotAxRftAiGgi07IMb7HSes6daHWJ9aHbEXsJyOcfPPsUUXP7OhdCwxDzZ1RxAj1YF5Fi6Zm3XyR6GJG1ec4vqe0X/AICiioT+ke8GSwCwnW4OoFhvtbLnxmzYg7IERAsTpx4W3qKLGCVGmHST6sl5mLjIGO3SUuKu0JaZ0vYjO1s/q6iixiMLiYBPtAENAADhpJdfsiOvVddX2XkbRafaAuRuJGcDqN11RD2YBUq2Ju64JBJiBrBOdwUs54uSMxJMkxe1jmcrrqiZCi7mmdwJMX1G+1zw4oBpyQQOHs2ykEKKLegezj6xgXMZZ24g5ofpHHRvVvjtAEdl1FEBgZeL7sjPh1cENx1Om7uUURMVcMtN0fXkhOJBjWOPHRRRAIJ1XqQnuXVEDI//2Q==",
                    lat: 37.27943075229118,
                    lng: 127.01763998406159,
                },
                {
                    content:
                        "https://youthpress.net/xe/files/attach/images/9794/273/649/1e0259ead592ec4e9d3a5673bf9cf4f2.jpg",
                    lat: 37.55915668706214,
                    lng: 126.92536526611102,
                },
                {
                    content:
                        "http://cdn.kormedi.com/TodayHealth/2018-03-30/shutterstock_64610245.jpg",
                    lat: 35.13854258261161,
                    lng: 129.1014781294671,
                },
                {
                    content:
                        "https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                    lat: 37.55518388656961,
                    lng: 126.92926237742505,
                },
                {
                    content:
                        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.18169-9/10801715_1569957256578131_8458996618892313494_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=6e5ad9&_nc_ohc=hFYTXA-1eWUAX9rSduO&_nc_ht=scontent-ssn1-1.xx&oh=76262bcf5e166302b43c71ddb369ff63&oe=61A7C71C",
                    lat: 35.20618517638034,
                    lng: 129.07944301057026,
                },
                {
                    content:
                        "https://www.water.or.kr/images/egovframework/life/weast/weast044_01.jpg",
                    lat: 37.561110808242056,
                    lng: 126.9831268386891,
                },
                {
                    content:
                        "https://celcliptipsprod.s3-ap-northeast-1.amazonaws.com/tips_article_body/a86e/858061/9e3e6af45b6aa537e62d5edb9a9f795d",
                    lat: 37.86187129655063,
                    lng: 127.7410250820423,
                },
                {
                    content: "8번예보관 날씨 흐림",
                    lat: 37.47160156778542,
                    lng: 126.62818064142286,
                },
                {
                    content: "9번예보관 날씨 흐림",
                    lat: 35.10233410927457,
                    lng: 129.02611815856181,
                },
                {
                    content: "10번예보관 날씨 흐림",
                    lat: 35.10215562270429,
                    lng: 129.02579793018205,
                },
                {
                    content: "11번예보관 날씨 흐림",
                    lat: 35.475423012251106,
                    lng: 128.76666923366042,
                },
                {
                    content: "12번예보관 날씨 흐림",
                    lat: 35.93282824693927,
                    lng: 126.95307628834287,
                },
                {
                    content: "13번예보관 날씨 흐림",
                    lat: 36.33884892276137,
                    lng: 127.393666019664,
                },
                {
                    content: "14번예보관 날씨 흐림",
                    lat: 37.520412849636,
                    lng: 126.9742764161581,
                },
                {
                    content: "15번예보관 날씨 흐림",
                    lat: 35.155139675209675,
                    lng: 129.06154773758374,
                },
                {
                    content: "16번예보관 날씨 흐림",
                    lat: 35.816041994696576,
                    lng: 127.11046706211324,
                },
                {
                    content: "17번예보관 날씨 흐림",
                    lat: 38.20441110638504,
                    lng: 128.59038671285234,
                },
                {
                    content: "18번예보관 날씨 흐림",
                    lat: 37.586112739308916,
                    lng: 127.02949148517999,
                },
                {
                    content: "19번예보관 날씨 흐림",
                    lat: 37.50380641844987,
                    lng: 127.02130716617751,
                },
                {
                    content: "20번예보관 날씨 흐림",
                    lat: 37.55155704387368,
                    lng: 126.92161115892036,
                },
                {
                    content: "21번예보관 날씨 흐림",
                    lat: 37.55413060051369,
                    lng: 126.92207472929526,
                },
                {
                    content: "22번예보관 날씨 흐림",
                    lat: 36.362321615174835,
                    lng: 127.35000483225389,
                },
                {
                    content: "23번예보관 날씨 흐림",
                    lat: 37.55227862908755,
                    lng: 126.92280546294998,
                },
                {
                    content: "24번예보관 날씨 흐림",
                    lat: 37.490413948014606,
                    lng: 127.02079678472444,
                },
                {
                    content: "25번예보관 날씨 흐림",
                    lat: 35.172358507549596,
                    lng: 126.90545394866643,
                },
                {
                    content: "26번예보관 날씨 흐림",
                    lat: 35.15474103200252,
                    lng: 129.11827889154455,
                },
                {
                    content: "27번예보관 날씨 흐림",
                    lat: 37.516081250973485,
                    lng: 127.02369057166361,
                },
                {
                    content: "28번예보관 날씨 흐림",
                    lat: 36.80711722863776,
                    lng: 127.14020346037576,
                },
                {
                    content: "29번예보관 날씨 흐림",
                    lat: 37.28957415752673,
                    lng: 127.00103752005424,
                },
                {
                    content: "30번예보관 날씨 흐림",
                    lat: 35.83953896766896,
                    lng: 128.7566880321854,
                },
                {
                    content: "31번예보관 날씨 흐림",
                    lat: 37.51027412948879,
                    lng: 127.08227718124704,
                },
                {
                    content: "32번예보관 날씨 흐림",
                    lat: 37.493581783270294,
                    lng: 126.72541955660554,
                },
                {
                    content: "33번예보관 날씨 흐림",
                    lat: 35.135291862962795,
                    lng: 129.10060911448775,
                },
                {
                    content: "34번예보관 날씨 흐림",
                    lat: 35.174574933144065,
                    lng: 126.91389980787773,
                },
                {
                    content: "35번예보관 날씨 흐림",
                    lat: 37.795887691878654,
                    lng: 127.10660416587146,
                },
                {
                    content: "36번예보관 날씨 흐림",
                    lat: 37.59288687521181,
                    lng: 126.96560524627377,
                },
                {
                    content: "37번예보관 날씨 흐림",
                    lat: 37.45076411130452,
                    lng: 127.14593003749792,
                },
                {
                    content: "38번예보관 날씨 흐림",
                    lat: 35.86008337557079,
                    lng: 127.1263912488061,
                },
                {
                    content: "39번예보관 날씨 흐림",
                    lat: 35.23773491330953,
                    lng: 129.08371037429578,
                },
                {
                    content: "40번예보관 날씨 흐림",
                    lat: 37.524297321304886,
                    lng: 127.05018281937049,
                },
                {
                    content: "41번예보관 날씨 흐림",
                    lat: 36.33386658021849,
                    lng: 127.4461721466889,
                },
                {
                    content: "42번예보관 날씨 흐림",
                    lat: 35.72963747546802,
                    lng: 128.27079056365005,
                },
                {
                    content: "43번예보관 날씨 흐림",
                    lat: 36.02726828142973,
                    lng: 129.37257233594056,
                },
                {
                    content: "44번예보관 날씨 흐림",
                    lat: 35.0708030360945,
                    lng: 129.0593185494088,
                },
                {
                    content: "45번예보관 날씨 흐림",
                    lat: 35.86835862950247,
                    lng: 128.59755089175871,
                },
                {
                    content: "46번예보관 날씨 흐림",
                    lat: 33.51133264696746,
                    lng: 126.51852347452322,
                },
                {
                    content: "47번예보관 날씨 흐림",
                    lat: 37.61284289586752,
                    lng: 127.03120547238589,
                },
                {
                    content: "48번예보관 날씨 흐림",
                    lat: 35.851696038722466,
                    lng: 128.59092937125666,
                },
                {
                    content: "49번예보관 날씨 흐림",
                    lat: 37.59084695083232,
                    lng: 127.01872773588882,
                },
                {
                    content: "50번예보관 날씨 흐림",
                    lat: 35.52114874288784,
                    lng: 129.33573629945764,
                },
                {
                    content: "51번예보관 날씨 흐림",
                    lat: 36.362326407439845,
                    lng: 127.33577420148076,
                },
                {
                    content: "52번예보관 날씨 흐림",
                    lat: 37.28941189110747,
                    lng: 127.00446132665141,
                },
                {
                    content: "53번예보관 날씨 흐림",
                    lat: 35.32049801117398,
                    lng: 129.1810343576788,
                },
                {
                    content: "54번예보관 날씨 흐림",
                    lat: 37.53338631541601,
                    lng: 127.00615481678061,
                },
                {
                    content: "55번예보관 날씨 흐림",
                    lat: 37.413461468258156,
                    lng: 126.67735680840826,
                },
                {
                    content: "56번예보관 날씨 흐림",
                    lat: 35.920390371093205,
                    lng: 128.54411720249956,
                },
                {
                    content: "57번예보관 날씨 흐림",
                    lat: 36.65489374054824,
                    lng: 127.48374816871991,
                },
                {
                    content: "58번예보관 날씨 흐림",
                    lat: 37.49491987110441,
                    lng: 127.01493134206048,
                },
                // {
                //     lat: 37.64985695608336,
                //     lng: 127.14496345268074,
                // },
                // {
                //     lat: 37.55686770317417,
                //     lng: 127.16927880543041,
                // },
                // {
                //     lat: 37.37014007589146,
                //     lng: 127.10614330185591,
                // },
                // {
                //     lat: 37.5350236507627,
                //     lng: 126.96157681184789,
                // },
                // {
                //     lat: 37.40549630594667,
                //     lng: 126.8980581820004,
                // },
                // {
                //     lat: 34.867950544005744,
                //     lng: 128.69069690081176,
                // },
                // {
                //     lat: 35.16317059543225,
                //     lng: 128.98452978748048,
                // },
                // {
                //     lat: 36.607484825953186,
                //     lng: 127.48520451195111,
                // },
                // {
                //     lat: 37.651724785213986,
                //     lng: 126.58306748337554,
                // },
                // {
                //     lat: 35.86059690063427,
                //     lng: 128.59193087665244,
                // },
                // {
                //     lat: 35.25685847585025,
                //     lng: 128.59912605060455,
                // },
                // {
                //     lat: 33.509258155694496,
                //     lng: 126.5109451464813,
                // },
                // {
                //     lat: 37.64366155701157,
                //     lng: 126.63255039247507,
                // },
                // {
                //     lat: 35.82667262227336,
                //     lng: 127.1030670574823,
                // },
                // {
                //     lat: 35.82003554991111,
                //     lng: 127.14810974062483,
                // },
                // {
                //     lat: 35.097485195649455,
                //     lng: 128.99486181862338,
                // },
                // {
                //     lat: 37.32204249590605,
                //     lng: 127.95591893585816,
                // },
                // {
                //     lat: 37.50535127272031,
                //     lng: 127.1047465440526,
                // },
                // {
                //     lat: 36.99081407156533,
                //     lng: 127.09338324956647,
                // },
                // {
                //     lat: 37.323486640444834,
                //     lng: 127.12285239871076,
                // },
                // {
                //     lat: 35.78973089440451,
                //     lng: 127.13644319545601,
                // },
                // {
                //     lat: 35.641373953578196,
                //     lng: 129.35463220719618,
                // },
                // {
                //     lat: 37.47423127310911,
                //     lng: 126.97625029161996,
                // },
                // {
                //     lat: 35.84357192991226,
                //     lng: 128.61143720719716,
                // },
                // {
                //     lat: 37.180974984085736,
                //     lng: 128.20294526341132,
                // },
                // {
                //     lat: 37.57895718642583,
                //     lng: 126.9316897337244,
                // },
                // {
                //     lat: 33.49077253755052,
                //     lng: 126.49314817000993,
                // },
                // {
                //     lat: 36.42175925330255,
                //     lng: 128.67409133225766,
                // },
                // {
                //     lat: 37.46405540570109,
                //     lng: 126.7153544119173,
                // },
                // {
                //     lat: 37.594758776232126,
                //     lng: 127.10099917489818,
                // },
                // {
                //     lat: 37.7239966558994,
                //     lng: 127.0478671731854,
                // },
                // {
                //     lat: 35.86680171505329,
                //     lng: 128.5923738376741,
                // },
                // {
                //     lat: 37.560573727266785,
                //     lng: 126.81239107485251,
                // },
                // {
                //     lat: 37.78692224857484,
                //     lng: 126.98966010341789,
                // },
                // {
                //     lat: 35.10368644802913,
                //     lng: 129.0206862606022,
                // },
                // {
                //     lat: 37.063839948992644,
                //     lng: 127.06856523030079,
                // },
                // {
                //     lat: 37.34344643728643,
                //     lng: 127.94382181350932,
                // },
                // {
                //     lat: 37.512521267219064,
                //     lng: 127.40054805648133,
                // },
                // {
                //     lat: 35.15286653837983,
                //     lng: 126.90419903971498,
                // },
                // {
                //     lat: 35.173238445546296,
                //     lng: 129.176082844468,
                // },
                // {
                //     lat: 36.082394201323524,
                //     lng: 129.40330471725923,
                // },
                // {
                //     lat: 37.51043665598106,
                //     lng: 127.03974070036524,
                // },
                // {
                //     lat: 36.627816673285054,
                //     lng: 127.44969866021904,
                // },
                // {
                //     lat: 37.59194624756919,
                //     lng: 127.01817545576053,
                // },
                // {
                //     lat: 37.387147045560866,
                //     lng: 127.1253365438929,
                // },
                // {
                //     lat: 35.89948383848115,
                //     lng: 128.60809550730653,
                // },
                // {
                //     lat: 37.555316235235324,
                //     lng: 127.14038447894715,
                // },
                // {
                //     lat: 36.09622092762977,
                //     lng: 128.43314679004078,
                // },
                // {
                //     lat: 37.582855922985544,
                //     lng: 126.91907857008522,
                // },
                // {
                //     lat: 37.516000983841586,
                //     lng: 128.72798872032757,
                // },
                // {
                //     lat: 37.48429363675198,
                //     lng: 127.0379630203579,
                // },
                // {
                //     lat: 37.54502575965604,
                //     lng: 126.95429338245707,
                // },
                // {
                //     lat: 35.236247173046394,
                //     lng: 128.8677618015292,
                // },
                // {
                //     lat: 37.40157536691968,
                //     lng: 127.11717457214067,
                // },
                // {
                //     lat: 36.95191038001258,
                //     lng: 127.91064040877527,
                // },
                // {
                //     lat: 37.491526492971346,
                //     lng: 126.85463749525812,
                // },
                // {
                //     lat: 36.124356479753196,
                //     lng: 128.09517052346138,
                // },
                // {
                //     lat: 37.15715169307048,
                //     lng: 128.15853461363773,
                // },
                // {
                //     lat: 37.5808156608605,
                //     lng: 126.95109705510639,
                // },
                // {
                //     lat: 37.46931787249714,
                //     lng: 126.89904775044873,
                // },
                // {
                //     lat: 35.52195614910054,
                //     lng: 129.3209904841746,
                // },
                // {
                //     lat: 37.58625703195563,
                //     lng: 126.9496035206742,
                // },
                // {
                //     lat: 37.28463639199199,
                //     lng: 126.85984474757359,
                // },
                // {
                //     lat: 35.534169458631226,
                //     lng: 129.31169021536095,
                // },
                // {
                //     lat: 37.553341234194285,
                //     lng: 127.15481222237025,
                // },
                // {
                //     lat: 37.62293367990081,
                //     lng: 126.83445005122417,
                // },
                // {
                //     lat: 35.5272027005698,
                //     lng: 127.72953798950101,
                // },
                // {
                //     lat: 35.180032285898854,
                //     lng: 128.06954509175367,
                // },
            ],
        })
    },
}
