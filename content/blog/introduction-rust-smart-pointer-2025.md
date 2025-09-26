---
title: 'เข้าใจ Smart Pointers ใน Rust'
date: '2025-06-01'
excerpt: 'สำรวจโลกของ Smart Pointers ใน Rust เรียนรู้เกี่ยวกับ Box, Rc, Arc, RefCell และการใช้งานเพื่อการจัดการหน่วยความจำที่ปลอดภัยและมีประสิทธิภาพ'
category: 'Programming Languages'
tags:
  ['rust', 'smart-pointers', 'memory-management', 'box', 'rc', 'arc', 'refcell']
coverImage: '/images/blog/default-cover.png'
author: 'Chanthawat'
authorImage: '/profile.jpeg'
authorBio: 'Software Engineering Student at UTCC.'
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

# เข้าใจ Smart Pointers ใน Rust การจัดการหน่วยความจำอย่างอัจฉริยะ

ในโลกของการเขียนโปรแกรม การจัดการหน่วยความจำ (Memory Management) เป็นหนึ่งในสิ่งที่ยากที่สุดและสำคัญที่สุด Rust ได้แก้ปัญหานี้ด้วยแนวคิดที่เรียกว่า **Smart Pointers** ซึ่งเป็นเครื่องมือที่ช่วยให้เราจัดการกับหน่วยความจำได้อย่างปลอดภัยและมีประสิทธิภาพ

## Smart Pointers คืออะไร?

Smart Pointers เป็นโครงสร้างข้อมูลที่ไม่เพียงแค่เก็บที่อยู่ของข้อมูลเหมือน pointer ธรรมดา แต่ยังมีข้อมูลเพิ่มเติม (metadata) และความสามารถพิเศษอื่นๆ ด้วย ใน Rust, Smart Pointers ถูกนำมาใช้เพื่อแก้ปัญหาต่างๆ ที่เกี่ยวกับ Ownership System

### ความแตกต่างระหว่าง References และ Smart Pointers

```rust
// Reference ธรรมดา
let x = 5;
let y = &x; // y เป็น reference ไปยัง x

// Smart Pointer
let x = Box::new(5); // x เป็น Smart Pointer
```

**References:**

- เป็นเพียง pointer ที่ชี้ไปยังข้อมูล
- ไม่มี ownership ของข้อมูล
- ไม่สามารถมี metadata เพิ่มเติมได้

**Smart Pointers:**

- มี ownership ของข้อมูล
- สามารถมี metadata เช่น reference count
- ใช้ `Deref` trait เพื่อใช้งานเหมือน reference
- ใช้ `Drop` trait เพื่อ cleanup เมื่อออกจาก scope

## Box<T> - การจัดเก็บข้อมูลใน Heap

`Box<T>` เป็น Smart Pointer พื้นฐานที่ใช้ในการจัดเก็บข้อมูลใน heap memory แทนที่จะเก็บใน stack

### ใช้งาน Box เมื่อไหร่?

1. **เมื่อข้อมูลมีขนาดใหญ่**
2. **เมื่อต้องการ transfer ownership โดยไม่ copy ข้อมูล**
3. **เมื่อต้องการ trait object**
4. **สำหรับ recursive types**

### ตัวอย่างการใช้งาน Box

```rust
// พื้นฐานของ Box
fn basic_box_example() {
    let b = Box::new(5);
    println!("b = {}", b);

    // Box จะ deallocate หน่วยความจำเมื่อออกจาก scope
}

// การใช้ Box กับ large data
struct LargeData {
    data: [u8; 1000000], // 1MB ของข้อมูล
}

fn large_data_example() {
    // ถ้าไม่ใช้ Box จะ copy ข้อมูล 1MB ทุกครั้งที่ pass function
    let large = Box::new(LargeData {
        data: [0; 1000000],
    });

    process_large_data(large); // transfer ownership, ไม่มีการ copy
}

fn process_large_data(data: Box<LargeData>) {
    // ทำงานกับข้อมูล
}
```

### Box กับ Recursive Types

```rust
// ไม่สามารถสร้าง recursive type ได้โดยตรง
// enum List {
//     Cons(i32, List), // Error: recursive type has infinite size
//     Nil,
// }

// ใช้ Box เพื่อแก้ปัญหา
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn recursive_list_example() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));

    // การ traverse list
    fn print_list(list: &List) {
        match list {
            Cons(value, next) => {
                println!("{}", value);
                print_list(next);
            }
            Nil => println!("End of list"),
        }
    }

    print_list(&list);
}
```

## Rc<T> - Reference Counting

`Rc<T>` (Reference Counting) ใช้เมื่อต้องการให้หลาย owners สามารถอ้างอิงข้อมูลชิ้นเดียวกันได้ โดยจะเก็บจำนวนการอ้างอิง และจะ deallocate เมื่อ reference count เป็น 0

### ข้อจำกัดของ Rc<T>

- ใช้ได้เฉพาะใน single-threaded เท่านั้น
- สร้าง immutable references เท่านั้น
- อาจเกิด reference cycles ได้

### ตัวอย่างการใช้งาน Rc

```rust
use std::rc::Rc;

fn rc_basic_example() {
    let data = Rc::new(String::from("Hello, Rust!"));

    let reference1 = Rc::clone(&data);
    let reference2 = Rc::clone(&data);

    println!("Reference count: {}", Rc::strong_count(&data)); // 3

    // เมื่อ references ออกจาก scope จำนวน count จะลดลง
    {
        let temp_ref = Rc::clone(&data);
        println!("Reference count: {}", Rc::strong_count(&data)); // 4
    } // temp_ref ถูก drop ที่นี่

    println!("Reference count: {}", Rc::strong_count(&data)); // 3
}

// การใช้ Rc กับ data structures
#[derive(Debug)]
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use List::{Cons, Nil};

fn shared_list_example() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));

    // b และ c ใช้ list เดียวกัน
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));

    println!("a: {:?}", a);
    println!("b: {:?}", b);
    println!("c: {:?}", c);
}
```

### การแก้ปัญหา Reference Cycles

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell<Vec<Rc<Node>>>,
    parent: RefCell<Weak<Node>>, // ใช้ Weak เพื่อหลีกเลี่ยง cycle
}

fn prevent_cycles_example() {
    let leaf = Rc::new(Node {
        value: 3,
        children: RefCell::new(vec![]),
        parent: RefCell::new(Weak::new()),
    });

    let branch = Rc::new(Node {
        value: 5,
        children: RefCell::new(vec![Rc::clone(&leaf)]),
        parent: RefCell::new(Weak::new()),
    });

    // ตั้งค่า parent ด้วย weak reference
    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent: {:?}", leaf.parent.borrow().upgrade());
}
```

## RefCell<T> - Interior Mutability

`RefCell<T>` ให้ความสามารถในการแก้ไขข้อมูลแม้ว่าจะมี immutable reference อยู่ก็ตาม โดยใช้การตรวจสอบ borrowing rules ในระหว่างการทำงาน (runtime)

### กฎการยืม (Borrowing Rules)

- หนึ่ง mutable reference หรือหลาย immutable references
- References ต้องถูกต้องเสมอ

### ตัวอย่างการใช้งาน RefCell

```rust
use std::cell::RefCell;

fn refcell_basic_example() {
    let data = RefCell::new(5);

    // การยืม immutable
    let value = data.borrow();
    println!("Value: {}", *value);
    drop(value); // ต้อง drop ก่อนยืม mutable

    // การยืม mutable
    {
        let mut mut_value = data.borrow_mut();
        *mut_value += 10;
    } // mutable borrow จบที่นี่

    println!("New value: {}", data.borrow());
}

// การใช้ RefCell กับ Rc
use std::rc::Rc;

fn rc_refcell_example() {
    let shared_data = Rc::new(RefCell::new(vec![1, 2, 3]));

    let a = Rc::clone(&shared_data);
    let b = Rc::clone(&shared_data);

    // ทุก reference สามารถแก้ไขข้อมูลได้
    a.borrow_mut().push(4);
    b.borrow_mut().push(5);

    println!("Shared data: {:?}", shared_data.borrow());
}
```

### Mock Objects ด้วย RefCell

```rust
pub trait Messenger {
    fn send(&self, msg: &str);
}

pub struct LimitTracker<'a, T: Messenger> {
    messenger: &'a T,
    value: usize,
    max: usize,
}

impl<'a, T> LimitTracker<'a, T>
where
    T: Messenger,
{
    pub fn new(messenger: &T, max: usize) -> LimitTracker<T> {
        LimitTracker {
            messenger,
            value: 0,
            max,
        }
    }

    pub fn set_value(&mut self, value: usize) {
        self.value = value;

        let percentage = self.value as f64 / self.max as f64;

        if percentage >= 1.0 {
            self.messenger.send("Error: You are over your quota!");
        } else if percentage >= 0.9 {
            self.messenger.send("Urgent warning: You've used up over 90% of your quota!");
        } else if percentage >= 0.75 {
            self.messenger.send("Warning: You've used up over 75% of your quota");
        }
    }
}

// Mock implementation สำหรับ testing
struct MockMessenger {
    sent_messages: RefCell<Vec<String>>,
}

impl MockMessenger {
    fn new() -> MockMessenger {
        MockMessenger {
            sent_messages: RefCell::new(vec![]),
        }
    }
}

impl Messenger for MockMessenger {
    fn send(&self, message: &str) {
        // ใช้ RefCell เพื่อแก้ไข immutable self
        self.sent_messages.borrow_mut().push(String::from(message));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);

        limit_tracker.set_value(80);

        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1);
    }
}
```

## Arc<T> - Atomic Reference Counting

`Arc<T>` เป็นเวอร์ชันของ `Rc<T>` ที่ปลอดภัยสำหรับ multithreading โดยใช้ atomic operations ในการจัดการ reference count

### ความแตกต่างระหว่าง Rc และ Arc

| Feature       | Rc<T>              | Arc<T>               |
| ------------- | ------------------ | -------------------- |
| Thread Safety | Single-threaded | Multi-threaded    |
| Performance   | เร็วกว่า           | ช้ากว่าเล็กน้อย      |
| Use Case      | Local sharing      | Cross-thread sharing |

### ตัวอย่างการใช้งาน Arc

```rust
use std::sync::Arc;
use std::thread;

fn arc_basic_example() {
    let data = Arc::new(vec![1, 2, 3, 4, 5]);
    let mut handles = vec![];

    for i in 0..5 {
        let data_clone = Arc::clone(&data);

        let handle = thread::spawn(move || {
            let sum: i32 = data_clone.iter().sum();
            println!("Thread {}: Sum = {}", i, sum);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

// การใช้ Arc กับ Mutex สำหรับ shared mutable state
use std::sync::Mutex;

fn arc_mutex_example() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter_clone = Arc::clone(&counter);

        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final counter value: {}", *counter.lock().unwrap());
}
```

## การรวม Smart Pointers

ในการใช้งานจริง เราสามารถรวม Smart Pointers หลายตัวเข้าด้วยกันได้

### Arc<Mutex<T>> - Shared Mutable State

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

#[derive(Debug)]
struct SharedData {
    counter: i32,
    message: String,
}

fn complex_sharing_example() {
    let shared = Arc::new(Mutex::new(SharedData {
        counter: 0,
        message: String::from("Initial"),
    }));

    let mut handles = vec![];

    // Reader threads
    for i in 0..3 {
        let shared_clone = Arc::clone(&shared);

        let handle = thread::spawn(move || {
            for _ in 0..5 {
                thread::sleep(Duration::from_millis(100));
                let data = shared_clone.lock().unwrap();
                println!("Reader {}: counter = {}, message = {}",
                        i, data.counter, data.message);
            }
        });

        handles.push(handle);
    }

    // Writer thread
    {
        let shared_clone = Arc::clone(&shared);

        let handle = thread::spawn(move || {
            for i in 1..=10 {
                thread::sleep(Duration::from_millis(150));
                let mut data = shared_clone.lock().unwrap();
                data.counter = i;
                data.message = format!("Update {}", i);
                println!("Writer: Updated to {}", i);
            }
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### Rc<RefCell<T>> - Single-threaded Shared Mutable State

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Graph {
    nodes: Vec<Rc<RefCell<Node>>>,
}

#[derive(Debug)]
struct Node {
    id: usize,
    connections: Vec<Rc<RefCell<Node>>>,
    data: String,
}

impl Graph {
    fn new() -> Self {
        Graph { nodes: vec![] }
    }

    fn add_node(&mut self, id: usize, data: String) -> Rc<RefCell<Node>> {
        let node = Rc::new(RefCell::new(Node {
            id,
            connections: vec![],
            data,
        }));

        self.nodes.push(Rc::clone(&node));
        node
    }

    fn connect_nodes(
        &self,
        node1: &Rc<RefCell<Node>>,
        node2: &Rc<RefCell<Node>>
    ) {
        node1.borrow_mut().connections.push(Rc::clone(node2));
        node2.borrow_mut().connections.push(Rc::clone(node1));
    }

    fn print_graph(&self) {
        for node in &self.nodes {
            let borrowed = node.borrow();
            println!("Node {}: {}", borrowed.id, borrowed.data);

            for connection in &borrowed.connections {
                let conn_borrowed = connection.borrow();
                println!("  -> Connected to Node {}", conn_borrowed.id);
            }
        }
    }
}

fn graph_example() {
    let mut graph = Graph::new();

    let node1 = graph.add_node(1, "First Node".to_string());
    let node2 = graph.add_node(2, "Second Node".to_string());
    let node3 = graph.add_node(3, "Third Node".to_string());

    graph.connect_nodes(&node1, &node2);
    graph.connect_nodes(&node2, &node3);

    // แก้ไขข้อมูลใน node
    node1.borrow_mut().data = "Updated First Node".to_string();

    graph.print_graph();
}
```

## การเลือกใช้ Smart Pointer ที่เหมาะสม

### Decision Tree

```
คุณต้องการ multiple ownership หรือไม่
├── ไม่ → ใช้ Box<T>
└── ใช่ → คุณจะใช้ใน multi-threaded หรือไม่
    ├── ไม่ (single-threaded) → คุณต้องการแก้ไขข้อมูลหรือไม่
    │   ├── ไม่ → ใช้ Rc<T>
    │   └── ใช่ → ใช้ Rc<RefCell<T>>
    └── ใช่ (multi-threaded) → คุณต้องการแก้ไขข้อมูลหรือไม่
        ├── ไม่ → ใช้ Arc<T>
        └── ใช่ → ใช้ Arc<Mutex<T>> หรือ Arc<RwLock<T>>
```

### สรุปการใช้งาน

| Scenario                            | Smart Pointer    | เหตุผล                                  |
| ----------------------------------- | ---------------- | --------------------------------------- |
| Large data on heap                  | `Box<T>`         | หลีกเลี่ยงการ copy ข้อมูลขนาดใหญ่       |
| Recursive types                     | `Box<T>`         | แก้ปัญหา infinite size                  |
| Multiple owners (single-thread)     | `Rc<T>`          | Share data ระหว่าง multiple owners      |
| Mutable shared data (single-thread) | `Rc<RefCell<T>>` | Interior mutability                     |
| Multiple owners (multi-thread)      | `Arc<T>`         | Thread-safe sharing                     |
| Mutable shared data (multi-thread)  | `Arc<Mutex<T>>`  | Thread-safe mutable sharing             |
| Mock objects in tests               | `RefCell<T>`     | Mutate data through immutable reference |

## Common Patterns และ Best Practices

### 1. การหลีกเลี่ยง Clone ที่ไม่จำเป็น

```rust
// ไม่ดี - clone ข้อมูลทุกครั้ง
fn process_data_bad(data: Vec<String>) -> Vec<String> {
    data.clone() // มีการ clone ที่ไม่จำเป็น
}

// ดี - ใช้ Box เพื่อ transfer ownership
fn process_data_good(data: Box<Vec<String>>) -> Box<Vec<String>> {
    // process data
    data
}

// หรือใช้ reference ถ้าไม่ต้องการ ownership
fn process_data_ref(data: &[String]) -> Vec<String> {
    // process and return new data
    data.to_vec()
}
```

### 2. การจัดการ Error กับ Smart Pointers

```rust
use std::rc::Rc;
use std::cell::RefCell;

fn safe_borrow_example() {
    let data = Rc::new(RefCell::new(vec![1, 2, 3]));

    // อาจเกิด panic
    // let _borrow1 = data.borrow_mut();
    // let _borrow2 = data.borrow_mut(); // panic!

    // ใช้ try_borrow แทน
    match data.try_borrow_mut() {
        Ok(mut borrowed) => {
            borrowed.push(4);
            println!("Successfully borrowed and modified");
        }
        Err(e) => {
            println!("Failed to borrow: {}", e);
        }
    }
}
```

### 3. Performance Considerations

```rust
use std::rc::Rc;
use std::sync::Arc;

fn performance_comparison() {
    // Rc - เร็วกว่าสำหรับ single-threaded
    let rc_data = Rc::new(String::from("data"));
    let rc_clone = Rc::clone(&rc_data); // Cheap pointer copy

    // Arc - ช้ากว่าเล็กน้อยเพราะ atomic operations
    let arc_data = Arc::new(String::from("data"));
    let arc_clone = Arc::clone(&arc_data); // Atomic increment

    // เลือกใช้ให้เหมาะสมกับ context
}
```

## การ Debug และ Troubleshooting

### Common Issues และวิธีแก้

#### 1. Borrow Checker Errors

```rust
use std::cell::RefCell;

fn borrow_error_example() {
    let data = RefCell::new(vec![1, 2, 3]);

    // จะ panic เพราะมี multiple mutable borrows
    // let mut borrow1 = data.borrow_mut();
    // let mut borrow2 = data.borrow_mut(); // panic!

    // ใช้ scope เพื่อจำกัด lifetime
    {
        let mut borrow1 = data.borrow_mut();
        borrow1.push(4);
    } // borrow1 drop ที่นี่

    {
        let mut borrow2 = data.borrow_mut();
        borrow2.push(5);
    }
}
```

#### 2. Reference Cycles

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

// สร้าง reference cycle
#[derive(Debug)]
struct BadNode {
    children: RefCell<Vec<Rc<BadNode>>>,
    parent: RefCell<Option<Rc<BadNode>>>, // Strong reference!
}

// ใช้ Weak reference เพื่อหลีกเลี่ยง cycle
#[derive(Debug)]
struct GoodNode {
    children: RefCell<Vec<Rc<GoodNode>>>,
    parent: RefCell<Weak<GoodNode>>, // Weak reference
}
```

#### 3. Thread Safety Issues

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn thread_safety_example() {
    // Rc ไม่ thread-safe
    // let data = Rc::new(Mutex::new(0));

    // ใช้ Arc แทน
    let data = Arc::new(Mutex::new(0));

    let handles: Vec<_> = (0..5)
        .map(|_| {
            let data = Arc::clone(&data);
            thread::spawn(move || {
                let mut val = data.lock().unwrap();
                *val += 1;
            })
        })
        .collect();

    for handle in handles {
        handle.join().unwrap();
    }
}
```

## แนวทางการเรียนรู้ต่อ

1. **ศึกษา Ownership System ให้ลึกซึ้ง** - ทำความเข้าใจ borrowing rules
2. **ฝึกเขียน Data Structures** - ลองสร้าง linked lists, trees, graphs
3. **เรียนรู้ Async Programming** - ทำความเข้าใจ `Pin<T>` และ `Future`
4. **ศึกษา Unsafe Rust** - เรียนรู้เมื่อไหร่ที่ต้องใช้ raw pointers

## สรุป

Smart Pointers ใน Rust เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการหน่วยความจำอย่างปลอดภัย:

- **Box<T>** - สำหรับการเก็บข้อมูลใน heap และ recursive types
- **Rc<T>** - สำหรับ multiple ownership ใน single-threaded
- **Arc<T>** - สำหรับ multiple ownership ใน multi-threaded
- **RefCell<T>** - สำหรับ interior mutability
- **การรวมใช้** - เช่น `Rc<RefCell<T>>` และ `Arc<Mutex<T>>`

การเข้าใจและใช้ Smart Pointers อย่างถูกต้องจะช่วยให้คุณเขียน Rust code ที่ปลอดภัย มีประสิทธิภาพ และไม่มี memory leaks

---