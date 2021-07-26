module.exports = function toReadable(number) {
    let dictionary = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
        ranks: {
            2: "hundred",
            3: "thousand",
            6: "million",
            9: "billion",
            12: "trillion",
            15: "quadrillion",
        },
        computed: (number, rank) => {
            let result = [];
            if (number === 0) {
                result.push("");
            } else if (dictionary.ranks[rank]) {
                result.push(
                    dictionary.computed(number) + " " + dictionary.ranks[rank]
                );
            } else if (dictionary[number]) {
                result.push(dictionary[number]);
            } else if (number >= 100 && number < 1000) {
                let hundreds = Math.floor(number / 100);
                let decimal = number - Math.floor(number / 100) * 100;

                result.push(dictionary[hundreds] + " hundred");
                if (decimal) {
                    result.push(dictionary.computed(decimal));
                }
            } else if (number < 100) {
                result.push(dictionary[Math.floor(number / 10) * 10]);
                if (number % 10) {
                    result.push(dictionary[number % 10]);
                }
            } else {
                for (
                    let i = Math.floor(Math.log10(number) / 3) * 3;
                    i >= 1;
                    i = i - 3
                ) {
                    if (dictionary[number]) {
                        result.push(dictionary[number]);
                    } else {
                        let base = Math.floor(number / 10 ** i);
                        number = number - base * 10 ** i;
                        result.push(dictionary.computed(base, i));
                    }
                }
                if (number) {
                    result.push(dictionary.computed(number));
                }
            }
            return result.join(" ").trim();
        },
    };

    if (number > 2 ** 53 || number < 0 || number % 1 !== 0) {
        return "Wrong number";
    } else if (number === 0) {
        return "zero";
    } else {
        return dictionary.computed(number);
    }
};
