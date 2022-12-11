The creation time of `flag.txt` in the challenge zip file was `1669826638`.

```rs
use rand::rngs::StdRng;
use rand::{Rng, SeedableRng};
use std::time::SystemTime;

fn randseed(ts: u64) -> StdRng {
    return StdRng::seed_from_u64(ts);
}
fn change(st: String) -> String {
    let mut arr: Vec<char> = st.chars().collect();
    let mut i = 0;
    while i <= arr.len() - 1 {
        let v1 = char::from_u32(arr[i] as u32 - 0x3);
        arr[i] = v1.unwrap();
        i = i + 1;
    }
    let s: String = arr.into_iter().collect();
    return s;
}
fn rand_xor(input: Vec<u8>, ts: u64) -> String {
    let mut rd = randseed(ts);
    return input
        .into_iter()
        .map(|c| format!("{:02x}", (c as u8 ^ rd.gen::<u8>())))
        .collect::<Vec<String>>()
        .join("");
}

fn main() -> std::io::Result<()> {
    let mut flag = String::new();
    std::io::stdin().read_line(&mut flag).unwrap();
    let flag_bytes = hex::decode(flag).unwrap();

    let mut obf = String::new();
    for ts in (1669826638 - 3600)..(1669826638 + 3600) {
        let xored = rand_xor(flag_bytes.clone(), ts);
        let dec = hex::decode(xored).unwrap();
        let xored_b = std::str::from_utf8(&dec);

        match xored_b {
            Ok(string) => {
                obf = string.to_string();
                println!("{} {:?}", ts, string);
				break;
            }
            Err(_) => {}
        }
    }

    let mess = &obf[10..37];
    let fin = change(mess.to_string());
    obf.replace_range(10..37, &fin);
    println!("{}", obf);
    Ok(())
}
```
