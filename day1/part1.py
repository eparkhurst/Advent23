

def get_digits(strArr):
    total = 0
    for str in strArr:
      first, second = None, None
      last_idx = len(str) -1
      for i in range(len(str)):
        if(first is None and str[i].isdigit()):
            first = str[i]
        if(second is None and str[last_idx - i].isdigit()):
            print(str[last_idx - i])
            second = str[last_idx - i]
        if(first and second):
            total += int(first+second)
            break
    return total


def main():
    with open("data.txt") as f:
      content = f.read().strip().split("\n")
    print(get_digits(content))

if __name__ == "__main__":
    main()