def c_tolqincha_chigorish(N):
    print(f"Sizgo N = {N} natural soni berilgan bolib, 1 dan N gacha sonlarni chiqaruv¬da dastur tuzing:")
    for i in range(1, N+1):
        if N % i == 0:
            print(i)

def kiruvchi_malumotlar():
    print("Birinchi qatorda natural son beriladi, N(1 <= N <= 1000).")
    N = int(input("N = "))
    c_tolqincha_chigorish(N)

kiruvchi_malumotlar()