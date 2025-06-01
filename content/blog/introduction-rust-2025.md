---
title: 'Rust: การสำรวจภาษาโปรแกรมมิ่งเพื่อประสิทธิภาพและความปลอดภัย'
date: '2025-06-01'
excerpt: 'สำรวจภาษา Rust ที่ผสานความเร็วและความปลอดภัยเข้าด้วยกัน เรียนรู้เกี่ยวกับระบบความเป็นเจ้าของ การจัดการหน่วยความจำ และคุณสมบัติที่ทำให้ Rust เป็นตัวเลือกที่ดีสำหรับการพัฒนาซอฟต์แวร์ยุคใหม่'
category: 'Programming Languages'
tags:
  ['rust', 'programming', 'memory-safety', 'performance', 'systems-programming']
coverImage: '/images/blog/default-cover.png'
author: 'Chanthawat'
authorImage: '/profile.jpeg'
authorBio: '@ENWUFT at UTCC'
affiliateLinks:
  - id: 'vscode-github-copilot'
    url: 'https://github.com/features/copilot?ref=boring9dev'
    platform: 'GitHub'
    title: 'GitHub Copilot'
    description: 'AI-powered code completion tool that helps you write Rust code faster and with fewer bugs.'
    price: '$10/month'
    imageUrl: '/images/affiliates/github-copilot.svg'
  - id: 'vercel-pro'
    url: 'https://vercel.com/pricing?ref=boring9dev'
    platform: 'Vercel'
    title: 'Vercel Pro Plan'
    description: 'Fast deployment platform with support for Rust via WebAssembly and Serverless Functions.'
    price: '$20/month'
    discount: 'First month free'
    imageUrl: '/images/affiliates/vercel.svg'
  - id: 'figma-professional'
    url: 'https://figma.com/pricing?ref=boring9dev'
    platform: 'Figma'
    title: 'Figma Professional'
    description: 'Collaborative design tool for creating user interfaces for your Rust applications.'
    price: '$12/month'
    imageUrl: '/images/affiliates/figma.svg'
  - id: 'jetbrains-intellij'
    url: 'https://www.jetbrains.com/idea/?ref=boring9dev'
    platform: 'JetBrains'
    title: 'IntelliJ IDEA with Rust Plugin'
    description: 'Powerful IDE with excellent Rust integration through the Rust plugin.'
    price: '$149/year'
    discount: '30% off first year'
    imageUrl: '/images/affiliates/intellij.svg'
---

# Rust: การสำรวจภาษาโปรแกรมมิ่งเพื่อประสิทธิภาพและความปลอดภัย

## 1. บทนำสู่ Rust (Introduction to Rust)

Rust เป็นภาษาโปรแกรมมิ่งสมัยใหม่ที่ได้รับการพัฒนาโดย Mozilla Research โดยมีเป้าหมายหลักเพื่อผสานการควบคุมระบบในระดับต่ำ (low-level performance control) เข้ากับความสะดวกในการใช้งานและความปลอดภัยในระดับสูง (high-level convenience and safety) หนึ่งในลักษณะเด่นที่สำคัญของ Rust คือการทำงานโดยไม่ต้องอาศัย Garbage Collector (GC) หรือ Runtime ขนาดใหญ่ ซึ่งทำให้ไลบรารีที่เขียนด้วย Rust สามารถทำหน้าที่เป็น "drop-in replacement" สำหรับภาษา C ได้อย่างมีประสิทธิภาพ

### 1.1. Rust คืออะไร: ปรัชญาและเป้าหมาย (What is Rust: Philosophy and Goals)

Rust ถูกออกแบบมาเพื่อแก้ไขปัญหาที่นักพัฒนาระบบมักเผชิญ คือการต้องเลือกระหว่างประสิทธิภาพของภาษาเช่น C/C++ กับความปลอดภัยที่มาพร้อมกับภาษาที่มี Garbage Collector ปรัชญาหลักของ Rust คือการมอบทั้งความเร็วและความปลอดภัยพร้อมกัน โดยไม่จำเป็นต้องมี GC ซึ่งมักจะนำมาซึ่ง overhead และความไม่แน่นอนในการจัดการหน่วยความจำ

การที่ Rust ไม่พึ่งพา GC นั้นส่งผลโดยตรงต่อประสิทธิภาพที่คาดการณ์ได้ และเป็นปัจจัยสำคัญที่ทำให้ Rust ต้องพัฒนาระบบความเป็นเจ้าของ (ownership system) และการยืม (borrowing) อันเป็นเอกลักษณ์ เพื่อให้สามารถจัดการหน่วยความจำได้อย่างปลอดภัย

ความสามารถในการเป็น "drop-in replacement" สำหรับ C นั้นบ่งชี้ถึงความเข้ากันได้ในระดับ Application Binary Interface (ABI) และการมุ่งเน้นไปที่การมี runtime ที่น้อยที่สุด การไม่มี runtime ขนาดใหญ่หรือ GC เป็นปัจจัยสำคัญที่ทำให้ Rust สามารถทำงานร่วมกับระบบอื่นหรือแทนที่ส่วนประกอบของ C ทีละส่วนได้อย่างราบรื่น

### 1.2. ประวัติและการพัฒนา (History and Development)

Rust เปิดตัวเวอร์ชันแรก (0.1) ในเดือนมกราคม 2012 และมีการพัฒนาอย่างรวดเร็วจนกระทั่ง Rust 1.0 ได้รับการเปิดตัวในวันที่ 15 พฤษภาคม 2015 พร้อมกับการรับประกันความเข้ากันได้แบบย้อนหลัง (backward compatibility) ซึ่งเป็นสิ่งสำคัญอย่างยิ่งสำหรับการใช้งานในระดับโปรดักชัน

Rust ใช้รูปแบบการปล่อยเวอร์ชันแบบ "train-based release model" โดยมีการปล่อยเวอร์ชันใหม่ทุกๆ หกสัปดาห์ ซึ่งแสดงให้เห็นถึงความมุ่งมั่นในการพัฒนาอย่างต่อเนื่องควบคู่ไปกับการรักษาเสถียรภาพสำหรับผู้ใช้เวอร์ชัน stable

การพัฒนานี้เริ่มต้นจาก Mozilla Research ซึ่งให้ความน่าเชื่อถือในด้านวิศวกรรม รูปแบบการปล่อยเวอร์ชันแบบรถไฟ (train model) สะท้อนถึงแนวทางที่ทันสมัยในการพัฒนาภาษาโปรแกรม โดยมีการทดลองฟีเจอร์ใหม่ๆ ใน nightly builds และ beta channel ในขณะที่เวอร์ชัน stable ยังคงความน่าเชื่อถือ

## 2. เริ่มต้นกับ Rust: พื้นฐานที่ควรรู้ (Getting Started with Rust: Essential Basics)

การทำความเข้าใจพื้นฐานของ Rust เป็นก้าวแรกที่สำคัญในการเรียนรู้ภาษาโปรแกรมมิ่งนี้ ส่วนนี้จะครอบคลุมองค์ประกอบหลักที่จำเป็นสำหรับการเขียนโปรแกรม Rust เบื้องต้น

### 2.1. ความคิดเห็นในโค้ด (Comments in Code)

Rust รองรับการเขียนความคิดเห็นในโค้ดหลายรูปแบบ ซึ่งเป็นสิ่งจำเป็นสำหรับการทำความเข้าใจและบำรุงรักษาโค้ด รูปแบบความคิดเห็นได้แก่:

- ความคิดเห็นแบบบรรทัดเดียว (line comments) เริ่มต้นด้วย //
- ความคิดเห็นแบบหลายบรรทัด (block comments) เริ่มต้นด้วย /_ และสิ้นสุดด้วย _/ และสามารถซ้อนกันได้ (nestable)
- ความคิดเห็นสำหรับเอกสาร (documentation comments) เริ่มต้นด้วย /// และรองรับการใช้งาน Markdown

````rust
// นี่คือความคิดเห็นแบบบรรทัดเดียว
// สามารถขยายได้หลายบรรทัดแบบนี้

/* นี่คือความคิดเห็นแบบบล็อก
/* สามารถซ้อนกันได้ */ */

/// ความคิดเห็นสำหรับเอกสารจะหน้าตาแบบนี้ และรองรับ Markdown
/// # ตัวอย่าง
///
/// ```
/// let five = 5;
/// ```
````

### 2.2. ฟังก์ชันและการประกาศ (Functions and Declarations, including fn main)

ฟังก์ชันใน Rust ถูกประกาศด้วยคีย์เวิร์ด fn ตามด้วยชื่อฟังก์ชัน รายการพารามิเตอร์ และชนิดข้อมูลที่ส่งคืน (return type) ฟังก์ชัน main เป็นจุดเริ่มต้นของการทำงานของโปรแกรม Rust ทุกโปรแกรม

```rust
#[allow(dead_code)]
// ฟังก์ชัน
// `i32` คือชนิดข้อมูลสำหรับจำนวนเต็มแบบมีเครื่องหมายขนาด 32 บิต
fn add2(x: i32, y: i32) -> i32 {
    // การคืนค่าแบบไม่ระบุชัดเจน (implicit return) (ไม่มีเครื่องหมายเซมิโคลอน)
    x + y
}

#[allow(unused_variables)]
#[allow(unused_assignments)]
#[allow(dead_code)]
// ฟังก์ชันหลัก
fn main() {
    // ส่วนนี้จะถูกเติมเต็มในหัวข้อถัดไป
}
```

### 2.3. ตัวแปร, การเปลี่ยนแปลงค่า, และการอนุมานชนิดข้อมูล (Variables, Mutability, and Type Inference)

ใน Rust ตัวแปรจะถูกผูกมัดกับค่า (bindings) โดยใช้คีย์เวิร์ด let โดยปกติแล้ว ตัวแปรเหล่านี้จะไม่สามารถเปลี่ยนแปลงค่าได้ (immutable) หากต้องการให้ตัวแปรสามารถเปลี่ยนแปลงค่าได้ ต้องใช้คีย์เวิร์ด mut

```rust
// ภายใน fn main()
// ตัวเลข //
// การผูกมัดค่าแบบไม่เปลี่ยนรูป (Immutable bindings)
let x: i32 = 1;

// ส่วนต่อท้ายสำหรับชนิดจำนวนเต็ม/ทศนิยม
let y: i32 = 13i32;
let f: f64 = 1.3f64;

// การอนุมานชนิดข้อมูล (Type inference)
// ส่วนใหญ่แล้ว คอมไพเลอร์ Rust สามารถอนุมานชนิดข้อมูลของตัวแปรได้
let implicit_x = 1;
let implicit_f = 1.3;

// การคำนวณ
let sum = x + y + 13; // sum จะมีชนิดข้อมูลเป็น i32

// ตัวแปรที่สามารถเปลี่ยนแปลงค่าได้ (Mutable variable)
let mut mutable = 1;
mutable = 4;
mutable += 2; // mutable ตอนนี้คือ 6
```

### 2.4. ชนิดข้อมูลพื้นฐาน (Primitive Data Types)

Rust มีชนิดข้อมูลพื้นฐานหลายชนิดสำหรับแทนค่าต่างๆ เช่น จำนวนเต็ม (integers), จำนวนทศนิยม (floating-point numbers), ค่าความจริง (booleans), และอักขระ (characters)

| ชนิดข้อมูล (Type) | ขนาด (Bits)        | คำอธิบาย (Description)                                            |
| ----------------- | ------------------ | ----------------------------------------------------------------- |
| i8                | 8                  | จำนวนเต็มแบบมีเครื่องหมาย 8 บิต                                   |
| u8                | 8                  | จำนวนเต็มแบบไม่มีเครื่องหมาย 8 บิต (ไบต์)                         |
| i16               | 16                 | จำนวนเต็มแบบมีเครื่องหมาย 16 บิต                                  |
| u16               | 16                 | จำนวนเต็มแบบไม่มีเครื่องหมาย 16 บิต                               |
| i32               | 32                 | จำนวนเต็มแบบมีเครื่องหมาย 32 บิต                                  |
| u32               | 32                 | จำนวนเต็มแบบไม่มีเครื่องหมาย 32 บิต                               |
| i64               | 64                 | จำนวนเต็มแบบมีเครื่องหมาย 64 บิต                                  |
| u64               | 64                 | จำนวนเต็มแบบไม่มีเครื่องหมาย 64 บิต                               |
| i128              | 128                | จำนวนเต็มแบบมีเครื่องหมาย 128 บิต                                 |
| u128              | 128                | จำนวนเต็มแบบไม่มีเครื่องหมาย 128 บิต                              |
| isize             | ขึ้นกับสถาปัตยกรรม | จำนวนเต็มแบบมีเครื่องหมาย ขนาดเท่าพอยน์เตอร์                      |
| usize             | ขึ้นกับสถาปัตยกรรม | จำนวนเต็มแบบไม่มีเครื่องหมาย ขนาดเท่าพอยน์เตอร์ (สำหรับ indexing) |
| f32               | 32                 | จำนวนทศนิยมความแม่นยำเดี่ยว (single-precision)                    |
| f64               | 64                 | จำนวนทศนิยมความแม่นยำคู่ (double-precision)                       |
| bool              | 8 (1 bit used)     | ค่าความจริง (true หรือ false)                                     |
| char              | 32 (4 bytes)       | อักขระ Unicode (Scalar Value)                                     |

### 2.5. สตริงและการจัดการข้อความ (Strings and Text Manipulation: &str, String)

Rust มีชนิดข้อมูลหลักสองชนิดสำหรับจัดการกับข้อความ:

- **&str**: เป็นการอ้างอิงถึงลำดับของอักขระ UTF-8 ที่จัดเก็บไว้ที่อื่น โดยทั่วไปแล้ว &str จะไม่สามารถเปลี่ยนแปลงค่าได้ (immutable) สตริงลิเทอรัล (string literals) เช่น "hello world!" มีชนิดข้อมูลเป็น &str และข้อมูลของมันจะถูกฝังอยู่ในโปรแกรมโดยตรง (statically allocated)
- **String**: เป็นชนิดข้อมูลสตริงที่จัดสรรหน่วยความจำบนฮีป (heap-allocated) สามารถเติบโตและเปลี่ยนแปลงค่าได้ (mutable) สร้างได้โดยการแปลงจาก &str โดยใช้เมธอด to_string()

```rust
// สตริงลิเทอรัล
let x_str: &str = "hello world!";

// การพิมพ์
println!("{} {}", 1.3, x_str); // แสดงผล: 1.3 hello world!

// `String` – สตริงที่จัดสรรบนฮีป
let s: String = "hello world".to_string();

// สตริงสไลซ์ – มุมมองที่ไม่เปลี่ยนรูปไปยังสตริงอื่น
let s_slice: &str = &s;

println!("{} {}", s, s_slice); // hello world hello world
```

## 3. โครงสร้างข้อมูลใน Rust (Data Structures in Rust)

Rust มีโครงสร้างข้อมูลพื้นฐานหลายอย่างที่ช่วยในการจัดระเบียบและจัดการข้อมูลอย่างมีประสิทธิภาพ

### 3.1. อาร์เรย์และเวกเตอร์ (Arrays and Vectors)

- **อาร์เรย์ (Array)**: เป็นคอลเลกชันขององค์ประกอบชนิดเดียวกันที่มีขนาดคงที่ ขนาดของอาร์เรย์เป็นส่วนหนึ่งของชนิดข้อมูลของมัน ([T; N], โดยที่ T คือชนิดข้อมูล และ N คือจำนวนองค์ประกอบ)

```rust
// อาร์เรย์ขนาดคงที่
let four_ints: [i32; 4] = [1, 2, 3, 4];
println!("{:?}", four_ints); // แสดงผล: [1, 2, 3, 4]
```

- **เวกเตอร์ (Vector)**: เป็นคอลเลกชันขององค์ประกอบชนิดเดียวกันที่สามารถขยายขนาดได้แบบไดนามิก (Vec<T>) เวกเตอร์จัดสรรหน่วยความจำบนฮีป

```rust
// อาร์เรย์แบบไดนามิก (เวกเตอร์)
let mut vector: Vec<i32> = vec![1, 2]; // สร้าง vector พร้อมค่าเริ่มต้น
vector.push(3); // เพิ่ม 3 เข้าไปใน vector
vector.push(4);
println!("{:?}", vector); // แสดงผล: [1, 2, 3, 4]
```

### 3.2. สไลซ์: มุมมองสู่ข้อมูล (Slices: A View into Data)

สไลซ์ (&[T]) เป็น "มุมมอง" (view) หรือการอ้างอิงไปยังส่วนหนึ่งของคอลเลกชันข้อมูลที่ต่อเนื่องกัน เช่น อาร์เรย์หรือเวกเตอร์ โดยไม่จำเป็นต้องเป็นเจ้าของข้อมูลนั้น สไลซ์เป็นวิธีที่มีประสิทธิภาพในการทำงานกับข้อมูลบางส่วนโดยไม่ต้องคัดลอก

```rust
let mut vector: Vec<i32> = vec![1, 2, 3, 4];
// สไลซ์ – มุมมองที่ไม่เปลี่ยนรูปไปยังเวกเตอร์หรืออาร์เรย์
let slice: &[i32] = &vector[1..3]; // slice จะเป็น [2, 3]
println!("{:?}", slice); // แสดงผล: [2, 3]
```

### 3.3. ทูเพิล (Tuples)

ทูเพิลเป็นกลุ่มของค่าที่มีชนิดข้อมูลต่างกันได้ โดยมีขนาดคงที่และเรียงตามลำดับ เหมาะสำหรับการรวมกลุ่มข้อมูลที่เกี่ยวข้องกันอย่างรวดเร็ว หรือการคืนค่าหลายค่าจากฟังก์ชัน

```rust
// ทูเพิลเป็นชุดของค่าที่มีขนาดคงที่และอาจมีชนิดข้อมูลต่างกัน
let x_tuple: (i32, &str, f64) = (1, "hello", 3.4);

// การแยกส่วนประกอบ (Destructuring `let`)
let (a, b, c) = x_tuple;
println!("{} {} {}", a, b, c); // แสดงผล: 1 hello 3.4

// การเข้าถึงสมาชิกด้วยดัชนี
println!("{}", x_tuple.1); // แสดงผล: hello
```

## 4. การสร้างชนิดข้อมูลของคุณเอง (Defining Your Own Types)

Rust ช่วยให้ผู้ใช้สามารถกำหนดชนิดข้อมูลของตนเองได้ผ่าน struct และ enum ซึ่งเป็นเครื่องมือสำคัญในการสร้างแบบจำลองข้อมูลที่ซับซ้อนและมีความหมาย

### 4.1. Structs: การสร้างโครงสร้างข้อมูลที่ซับซ้อน (Structs: Building Complex Data Structures)

Structs (โครงสร้าง) ใช้สำหรับรวมกลุ่มข้อมูลที่เกี่ยวข้องกันเข้าด้วยกัน โดยแต่ละส่วนของข้อมูลเรียกว่าฟิลด์ (field)

**Struct แบบปกติ**: มีชื่อสำหรับแต่ละฟิลด์

```rust
struct Point {
    x: i32,
    y: i32,
}

let origin: Point = Point { x: 0, y: 0 };
println!("Point: ({}, {})", origin.x, origin.y); // แสดงผล: Point: (0, 0)
```

**Tuple Struct**: คล้ายกับ struct ปกติ แต่ฟิลด์ไม่มีชื่อ

```rust
struct Point2(i32, i32);

let origin2 = Point2(0, 0);
println!("Point2: ({}, {})", origin2.0, origin2.1); // แสดงผล: Point2: (0, 0)
```

### 4.2. Enums: การแจกแจงค่าที่เป็นไปได้ (Enums: Enumerating Possible Values, including Option<T>)

Enums (Enumerations) ใน Rust มีประสิทธิภาพมากกว่าในภาษา C/C++ มาก เพราะแต่ละ variant (ค่าที่เป็นไปได้) ของ enum สามารถมีข้อมูลที่เกี่ยวข้องกับมันได้ ทำให้ enums ใน Rust เป็น Algebraic Data Types (ADTs)

**Enum แบบพื้นฐาน (C-like Enum)**: แต่ละ variant เป็นเพียงชื่อ

```rust
enum Direction {
    Left,
    Right,
    Up,
    Down,
}

let up = Direction::Up;
```

**Enum ที่มีฟิลด์ข้อมูล**: แต่ละ variant สามารถเก็บข้อมูลที่มีชนิดและจำนวนต่างกันได้

```rust
enum OptionalI32 {
    AnI32(i32),
    Nothing,
}

let two: OptionalI32 = OptionalI32::AnI32(2);
let nothing = OptionalI32::Nothing;
```

## 5. พลังของ Generics (The Power of Generics)

Generics เป็นคุณสมบัติที่ช่วยให้สามารถเขียนโค้ดที่ยืดหยุ่นและสามารถทำงานกับชนิดข้อมูลที่หลากหลายได้โดยไม่ต้องเขียนโค้ดซ้ำซ้อน

### 5.1. การเขียนโค้ดที่ยืดหยุ่นด้วย Generics (Writing Flexible Code with Generics)

สามารถใช้ Generics กับ structs, enums, functions และ methods ได้ Option<T> ที่กล่าวถึงก่อนหน้านี้เป็นตัวอย่างที่ดีของ enum แบบ generic ที่มีอยู่ในไลบรารีมาตรฐานของ Rust

```rust
struct Foo<T> {
    bar: T,
}

// นี่ถูกนิยามในไลบรารีมาตรฐานเป็น `Option`
// `Option` ถูกใช้แทนที่ตำแหน่งที่ปกติจะใช้ null pointer
enum Optional<T> {
    SomeVal(T),
    NoVal,
}

let a_foo_i32 = Foo { bar: 10 }; // T คือ i32
let a_foo_str = Foo { bar: "hello" }; // T คือ &str

let an_option_i32 = Optional::SomeVal(5); // T คือ i32
let no_option = Optional::NoVal::<String>; // T คือ String, แต่ไม่มีค่า
```

## 6. เมธอดและ Traits (Methods and Traits)

เมธอดและ Traits เป็นกลไกสำคัญใน Rust ที่ช่วยในการกำหนดพฤติกรรมและการทำงานร่วมกันของชนิดข้อมูลต่างๆ

### 6.1. การนิยามเมธอดสำหรับ Structs และ Enums (Defining Methods for Structs and Enums)

เมธอด (Methods) คือฟังก์ชันที่เชื่อมโยงกับชนิดข้อมูลเฉพาะ (เช่น struct หรือ enum) โดยประกาศภายในบล็อก impl (implementation) พารามิเตอร์แรกของเมธอดมักจะเป็น self, &self, หรือ &mut self ซึ่งอ้างอิงถึงอินสแตนซ์ของชนิดข้อมูลนั้นๆ

```rust
struct Foo<T> {
    bar: T,
}

impl<T> Foo<T> {
    // เมธอดรับพารามิเตอร์ `self` อย่างชัดเจน
    fn bar(&self) -> &T { // self ถูกยืมมา
        &self.bar
    }
    fn bar_mut(&mut self) -> &mut T { // self ถูกยืมมาแบบ mutable
        &mut self.bar
    }
    fn into_bar(self) -> T { // ที่นี่ self ถูกบริโภค (consumed)
        self.bar
    }
}

let mut a_foo = Foo { bar: 1 };
println!("{}", a_foo.bar()); // 1
*(a_foo.bar_mut()) = 5;
println!("{}", a_foo.bar()); // 5
let val = a_foo.into_bar(); // a_foo ถูกย้ายไปแล้ว ไม่สามารถใช้ได้อีก
println!("{}", val); // 5
```

### 6.2. Traits: การกำหนดพฤติกรรมร่วม (Traits: Defining Shared Behavior)

Traits ใน Rust คล้ายกับ interfaces ในภาษาอื่น หรือ typeclasses ใน Haskell มันเป็นวิธีการกำหนดชุดของเมธอดที่ชนิดข้อมูลสามารถนำไป implement เพื่อระบุว่าชนิดข้อมูลนั้นมีพฤติกรรมบางอย่าง Traits ช่วยให้สามารถเขียนโค้ดแบบ polymorphic ได้

```rust
trait Frobnicate<T> {
    fn frobnicate(self) -> Option<T>;
}

impl<T> Frobnicate<T> for Foo<T> {
    fn frobnicate(self) -> Option<T> {
        Some(self.bar)
    }
}

let another_foo = Foo { bar: 1 };
println!("{:?}", another_foo.frobnicate()); // Some(1)
```

## 7. การจับคู่รูปแบบ (Pattern Matching)

Pattern matching เป็นคุณสมบัติที่ทรงพลังใน Rust ซึ่งช่วยให้สามารถตรวจสอบและแยกส่วนประกอบของข้อมูลตามโครงสร้างของมันได้อย่างละเอียดและปลอดภัย

### 7.1. การใช้งาน match เพื่อควบคุมการทำงานอย่างละเอียด (Using match for Detailed Control Flow)

คีย์เวิร์ด match ใช้สำหรับเปรียบเทียบค่ากับชุดของรูปแบบ (patterns) และดำเนินการโค้ดที่สอดคล้องกับรูปแบบที่ตรงกัน คอมไพเลอร์ Rust จะตรวจสอบว่าทุกกรณีที่เป็นไปได้ถูกจัดการ (exhaustiveness checking) ซึ่งช่วยป้องกันข้อผิดพลาดจากการลืมจัดการบางกรณี โดยเฉพาะเมื่อใช้กับ enums

```rust
enum OptionalI32 { AnI32(i32), Nothing }

let foo = OptionalI32::AnI32(1);
match foo {
    OptionalI32::AnI32(n) => println!("it's an i32: {}", n),
    OptionalI32::Nothing => println!("it's nothing!"),
}

// การจับคู่รูปแบบขั้นสูง
struct FooBar { x: i32, y: OptionalI32 }
let bar = FooBar { x: 15, y: OptionalI32::AnI32(32) };
match bar {
    FooBar { x: 0, y: OptionalI32::AnI32(0) } =>
        println!("The numbers are zero!"),
    FooBar { x: n, y: OptionalI32::AnI32(m) } if n == m => // นี่คือ match guard
        println!("The numbers are the same"),
    FooBar { x: n, y: OptionalI32::AnI32(m) } =>
        println!("Different numbers: {} {}", n, m),
    FooBar { x: _, y: OptionalI32::Nothing } => // _ คือ wildcard, จับคู่กับค่าใดๆ
        println!("The second number is Nothing!"),
}
```

## 8. การควบคุมการไหลของโปรแกรม (Control Flow)

Rust มีโครงสร้างการควบคุมการไหลของโปรแกรมที่คุ้นเคยจากภาษาโปรแกรมมิ่งอื่นๆ รวมถึงคุณสมบัติที่น่าสนใจบางอย่าง

### 8.1. for loops/iteration, Ranges, if/else expressions, while loops, loop

**for loops**: ใช้สำหรับการวนซ้ำผ่าน iterator โดยทั่วไปใช้กับ ranges หรือคอลเลกชัน

```rust
let array = [1, 2, 3, 4];
for i in array { // array.iter() ถูกเรียกโดยปริยาย
    println!("{}", i);
}

// Ranges
for i in 0u32..10 { // วนซ้ำตั้งแต่ 0 ถึง 9 (ไม่รวม 10)
    print!("{} ", i);
}
println!(""); // ขึ้นบรรทัดใหม่
// แสดงผล `0 1 2 3 4 5 6 7 8 9 `
```

**if/else**: ใช้สำหรับการตัดสินใจตามเงื่อนไข ใน Rust, if เป็นนิพจน์ (expression) หมายความว่ามันสามารถคืนค่าได้

```rust
if 1 == 1 {
    println!("Maths is working!");
} else {
    println!("Oh no...");
}

// `if` เป็นนิพจน์
let value = if true {
    "good"
} else {
    "bad"
};
println!("Value is: {}", value); // Value is: good
```

**while loops**: วนซ้ำตราบเท่าที่เงื่อนไขยังคงเป็นจริง

```rust
let mut count = 0;
while count < 3 {
    println!("The universe is operating normally.");
    count += 1;
    // break; // สามารถใช้ break เพื่อออกจาก loop ได้
}
```

**loop**: สร้าง loop ที่ไม่มีวันสิ้นสุด (infinite loop) ต้องใช้ break เพื่อออกจาก loop

```rust
loop {
    println!("Hello!");
    // break statement gets out of the loop
    break;
}
```

## 9. หัวใจของ Rust: Ownership และ Memory Safety (The Heart of Rust: Ownership and Memory Safety)

ระบบความเป็นเจ้าของ (Ownership System) เป็นคุณสมบัติที่โดดเด่นที่สุดของ Rust และเป็นกลไกหลักที่ทำให้ Rust สามารถรับประกันความปลอดภัยของหน่วยความจำ (memory safety) โดยไม่ต้องใช้ Garbage Collector

### 9.1. ระบบ Ownership (The Ownership System)

ระบบความเป็นเจ้าของมีกฎหลักสามข้อ:

1. แต่ละค่าใน Rust มีตัวแปรที่เป็น "เจ้าของ" (owner) ของมัน
2. สามารถมีเจ้าของได้เพียงคนเดียวในแต่ละครั้ง
3. เมื่อเจ้าของออกจากขอบเขต (scope) ค่าจะถูก "ทิ้ง" (dropped) ซึ่งหมายถึงการคืนทรัพยากร (เช่น หน่วยความจำ)

```rust
// Owned pointer – มีเพียงสิ่งเดียวที่สามารถ 'เป็นเจ้าของ' พอยน์เตอร์นี้ได้ในแต่ละครั้ง
// ซึ่งหมายความว่าเมื่อ `Box` ออกนอกขอบเขตของมัน มันจะถูกปล่อย (deallocated) อย่างปลอดภัยโดยอัตโนมัติ
let mut mine: Box<i32> = Box::new(3);
*mine = 5; // dereference เพื่อแก้ไขค่า

// ที่นี่ `now_its_mine` รับความเป็นเจ้าของ `mine` กล่าวอีกนัยหนึ่ง `mine` ถูกย้าย (moved)
let mut now_its_mine = mine;
*now_its_mine += 2;

println!("{}", now_its_mine); // 7
// println!("{}", mine); // บรรทัดนี้จะไม่คอมไพล์ เพราะ `now_its_mine` เป็นเจ้าของพอยน์เตอร์แล้ว
```

### 9.2. การยืม (Borrowing): References (&T) และ Mutable References (&mut T)

การยืม (Borrowing) ช่วยให้สามารถเข้าถึงข้อมูลได้โดยไม่ต้องรับความเป็นเจ้าของ มีกฎสำคัญสองข้อสำหรับการยืม:

1. คุณสามารถมี immutable references (&T) กี่อันก็ได้ หรือมี mutable reference (&mut T) เพียงอันเดียวเท่านั้น
2. References จะต้องถูกต้องเสมอ (borrow checker จะตรวจสอบสิ่งนี้)

**Immutable Reference (&T)**: ยืมข้อมูลแบบไม่สามารถแก้ไขได้

```rust
let mut var = 4;
let ref_var: &i32 = &var;

println!("{}", var);
println!("{}", *ref_var);
// var = 5; // บรรทัดนี้จะไม่คอมไพล์ เพราะ `var` ถูกยืมอยู่ (immutably)
```

**Mutable Reference (&mut T)**: ยืมข้อมูลแบบสามารถแก้ไขได้

```rust
let mut var2 = 4;
let ref_var2: &mut i32 = &mut var2;
*ref_var2 += 2; // '*' ใช้เพื่อชี้ไปยัง var2 ที่ถูกยืมแบบ mutable

println!("{}", *ref_var2); // 6
// println!("{}", var2); // บรรทัดนี้จะไม่คอมไพล์ เพราะ var2 ถูกยืมแบบ mutable อยู่
```

## 10. ก้าวต่อไป: แหล่งข้อมูลเพิ่มเติม (Next Steps: Further Resources)

หลังจากทำความเข้าใจพื้นฐานของ Rust จากบทความนี้แล้ว มีแหล่งข้อมูลมากมายสำหรับการเรียนรู้เพิ่มเติมและการมีส่วนร่วมกับชุมชน Rust:

- บทความ "half-hour to learn Rust" โดย Fasterthanlime สำหรับคำอธิบายที่ลึกซึ้งยิ่งขึ้นเกี่ยวกับสัญลักษณ์และคีย์เวิร์ดของ Rust
- หนังสือ "The Rust Programming Language" (มักเรียกกันว่า "The Book") ซึ่งเป็นคู่มือฉบับสมบูรณ์อย่างเป็นทางการ
- Subreddit /r/rust สำหรับการสนทนาและข่าวสาร
- ช่องทาง #rust บน irc.mozilla.org สำหรับความช่วยเหลือจากชุมชน
- Rust Playground อย่างเป็นทางการ สำหรับการทดลองเขียนโค้ด Rust ออนไลน์โดยไม่ต้องติดตั้ง
- เว็บไซต์หลักของ Rust (rust-lang.org)

## 11. สรุป (Conclusion)

Rust นำเสนอแนวทางที่น่าสนใจในการพัฒนาซอฟต์แวร์ โดยมุ่งเน้นการผสานประสิทธิภาพระดับต่ำเข้ากับความปลอดภัยระดับสูงโดยไม่ต้องพึ่งพา Garbage Collector ระบบความเป็นเจ้าของ (Ownership) การยืม (Borrowing) และ Lifetimes เป็นหัวใจสำคัญที่ทำให้ Rust สามารถรับประกันความปลอดภัยของหน่วยความจำในเวลาคอมไพล์ได้

คุณสมบัติต่างๆ เช่น pattern matching, generics, และ traits ช่วยเพิ่มความสามารถในการแสดงออก (expressiveness) และความยืดหยุ่นของภาษา แม้ว่าแนวคิดบางอย่าง เช่น ความเป็นเจ้าของ อาจต้องใช้เวลาในการทำความเข้าใจ แต่ประโยชน์ที่ได้รับในแง่ของความน่าเชื่อถือ ประสิทธิภาพ และความสามารถในการเขียนโปรแกรมแบบพร้อมกัน (concurrency) อย่างปลอดภัยนั้นมีนัยสำคัญ ทำให้ Rust เป็นตัวเลือกที่น่าสนใจสำหรับโครงการที่หลากหลาย ตั้งแต่ระบบปฏิบัติการไปจนถึงเว็บแอปพลิเคชันและเครื่องมือสำหรับนักพัฒนา

---

_มีคำถามเกี่ยวกับ Rust หรือต้องการความช่วยเหลือในการเริ่มต้น? อย่าลังเลที่จะติดต่อผมผ่าน [Twitter](https://twitter.com/boring9dev) หรืออ่านบทความอื่นๆ เกี่ยวกับการพัฒนาซอฟต์แวร์ได้ที่นี่_
