---
title: 'Using Rust for ESP32 IoT Development'
date: '2025-05-18'
excerpt: 'Learn how to use Rust programming language for ESP32 microcontrollers in IoT projects with improved reliability and performance'
category: 'IoT'
tags: ['rust', 'esp32', 'embedded', 'iot', 'programming']
coverImage: '/images/blog/default-cover.png'
author: 'Chanthawat'
authorImage: '/profile.jpeg'
authorBio: "IoT developer and Software Engineering student at UTCC with expertise in embedded systems and modern programming languages. Fascinated by the intersection of Rust's memory safety and IoT device development. Building the future of connected devices one microcontroller at a time."
---

# Using Rust for ESP32 IoT Development

Rust is rapidly gaining popularity in embedded systems development due to its focus on memory safety, performance, and modern language features. The ESP32, a powerful and affordable microcontroller with built-in WiFi and Bluetooth capabilities, has become a staple in IoT projects. In this article, we'll explore how to combine Rust's safety guarantees with ESP32's connectivity features to build reliable IoT applications.

## Why Rust for Embedded Systems?

Traditionally, embedded systems have been programmed in C or C++, languages that offer excellent performance and low-level hardware control. However, they also come with significant drawbacks:

- **Memory safety issues**: Buffer overflows, null pointer dereferences, and use-after-free bugs are common and can lead to crashes or security vulnerabilities
- **Concurrency challenges**: Managing shared mutable state safely is difficult
- **Limited compile-time guarantees**: Many errors are only caught at runtime

Rust addresses these issues through:

1. **Ownership model**: Prevents memory leaks and use-after-free bugs
2. **No null pointers**: Option<T> explicitly handles the absence of values
3. **Thread safety**: The type system prevents data races
4. **Modern tooling**: Cargo for dependency management, rustfmt for formatting, and clippy for linting

## Setting Up Your Development Environment

To get started with Rust on ESP32, you'll need to set up a cross-compilation environment. Here's how:

```bash
# Install Rust first if you haven't already
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add support for the Xtensa architecture (used by ESP32)
cargo install espup
espup install

# Load the export variables
. $HOME/export-esp.sh

# Install additional tools for ESP32 development
cargo install cargo-espflash
cargo install cargo-espmonitor
```

## Creating Your First Rust ESP32 Project

The `esp-rs` ecosystem provides several templates to get started quickly:

```bash
# Install the project template
cargo install cargo-generate

# Create a new project from the esp-idf template
cargo generate esp-rs/esp-idf-template

# Follow the interactive prompts to configure your project
```

Let's examine a simple example that blinks an LED:

```rust
use esp_idf_hal::delay::FreeRtos;
use esp_idf_hal::gpio::{Gpio2, Output, PinDriver};
use esp_idf_sys as _;

fn main() -> anyhow::Result<()> {
    // Initialize the ESP-IDF runtime
    esp_idf_sys::link_patches();

    // Configure GPIO pin for the LED
    let mut led = PinDriver::output(Gpio2::new())?;

    println!("ESP32 LED blink example with Rust!");

    loop {
        // Toggle the LED
        led.toggle()?;
        println!("LED state toggled");

        // Wait for 1 second
        FreeRtos::delay_ms(1000);
    }
}
```

## WiFi Connectivity with Rust on ESP32

One of ESP32's key features is its built-in WiFi. Let's connect to a WiFi network:

```rust
use anyhow::Result;
use esp_idf_hal::delay::FreeRtos;
use esp_idf_svc::wifi::{BlockingWifi, ClientConfiguration, Configuration, EspWifi};
use esp_idf_svc::eventloop::EspSystemEventLoop;
use esp_idf_sys as _;
use log::info;

fn main() -> Result<()> {
    // Set up logging
    esp_idf_sys::link_patches();
    esp_idf_svc::log::EspLogger::initialize_default();

    info!("Starting WiFi connection example");

    // Set up event loop
    let sysloop = EspSystemEventLoop::take()?;

    // Set up WiFi
    let mut wifi = BlockingWifi::wrap(
        EspWifi::new(peripherals.modem, sysloop.clone(), None)?,
        sysloop,
    )?;

    // Configure WiFi
    let wifi_config = Configuration::Client(ClientConfiguration {
        ssid: "your_ssid".into(),
        password: "your_password".into(),
        ..Default::default()
    });

    wifi.set_configuration(&wifi_config)?;

    // Start WiFi
    wifi.start()?;
    info!("WiFi started");

    // Connect to WiFi
    wifi.connect()?;
    info!("WiFi connected, waiting for IP...");

    // Wait for IP address
    wifi.wait_netif_up()?;
    let ip_info = wifi.wifi().sta_netif().get_ip_info()?;
    info!("IP address: {:?}", ip_info.ip);

    // Your application code here

    Ok(())
}
```

## MQTT Communication for IoT Applications

In IoT applications, MQTT is a common protocol for device-to-cloud communication. Let's see how to implement an MQTT client in Rust on ESP32:

```rust
use anyhow::Result;
use esp_idf_hal::delay::FreeRtos;
use esp_idf_svc::mqtt::client::{EspMqttClient, MqttClientConfiguration};
use esp_idf_svc::mqtt::client::QoS;
use esp_idf_sys as _;
use log::info;
use std::time::Duration;

fn main() -> Result<()> {
    // Initialize ESP-IDF and connect to WiFi (as shown in previous example)
    // ...

    // Set up MQTT client
    let broker_url = "mqtt://mqtt.eclipse.org:1883";
    let client_id = "esp32-rust-client";

    let mqtt_config = MqttClientConfiguration {
        client_id: Some(client_id),
        ..Default::default()
    };

    let mut mqtt_client = EspMqttClient::new(broker_url, &mqtt_config)?;
    info!("MQTT client initialized");

    // Subscribe to a topic
    mqtt_client.subscribe("esp32/test", QoS::AtMostOnce)?;
    info!("Subscribed to topic: esp32/test");

    // Main loop
    let mut counter = 0;
    loop {
        // Publish a message
        let message = format!("Hello from ESP32 Rust! Count: {}", counter);
        mqtt_client.publish("esp32/status", QoS::AtMostOnce, false, message.as_bytes())?;
        info!("Published: {}", message);

        counter += 1;
        FreeRtos::delay_ms(5000);
    }
}
```

## Handling Sensors with Rust on ESP32

ESP32 is commonly used with various sensors. Let's see how to read from a BME280 temperature, humidity, and pressure sensor:

```rust
use anyhow::Result;
use esp_idf_hal::i2c::{I2cConfig, I2cDriver};
use esp_idf_hal::peripherals::Peripherals;
use esp_idf_hal::delay::FreeRtos;
use esp_idf_sys as _;
use bme280::BME280;
use log::info;

fn main() -> Result<()> {
    // Initialize ESP-IDF and logging
    esp_idf_sys::link_patches();
    esp_idf_svc::log::EspLogger::initialize_default();

    // Set up I2C
    let peripherals = Peripherals::take().unwrap();
    let i2c = peripherals.i2c0;
    let sda = peripherals.pins.gpio21;
    let scl = peripherals.pins.gpio22;

    let config = I2cConfig::new().baudrate(100.kHz().into());
    let i2c = I2cDriver::new(i2c, sda, scl, &config)?;

    // Initialize BME280 sensor
    let mut bme280 = BME280::new_primary(i2c);
    bme280.init()?;

    // Main loop
    loop {
        // Read sensor data
        let measurements = bme280.measure()?;

        info!(
            "Temperature: {:.2}°C, Humidity: {:.2}%, Pressure: {:.2} hPa",
            measurements.temperature,
            measurements.humidity,
            measurements.pressure / 100.0 // Convert Pa to hPa
        );

        FreeRtos::delay_ms(2000);
    }
}
```

## Improving Power Management

For battery-powered IoT devices, power management is crucial. Rust allows fine-grained control over ESP32's sleep modes:

```rust
use anyhow::Result;
use esp_idf_hal::delay::FreeRtos;
use esp_idf_hal::gpio::PinDriver;
use esp_idf_sys as _;
use esp_idf_sys::{esp_sleep_enable_timer_wakeup, esp_deep_sleep_start};
use log::info;

fn main() -> Result<()> {
    // Initialize ESP-IDF and logging
    esp_idf_sys::link_patches();
    esp_idf_svc::log::EspLogger::initialize_default();

    info!("Power management example");

    // Main loop
    let mut counter = 0;
    loop {
        // Do some work
        info!("Awake and working... (cycle {})", counter);

        // Stay awake for 5 seconds
        FreeRtos::delay_ms(5000);

        counter += 1;

        // Go to deep sleep for 10 seconds
        info!("Going to deep sleep for 10 seconds...");

        // Configure wakeup timer (time in microseconds)
        unsafe {
            esp_sleep_enable_timer_wakeup(10 * 1000 * 1000);
            esp_deep_sleep_start();
        }

        // This line is never reached as the device resets after deep sleep
    }
}
```

## Conclusion

Rust brings significant advantages to ESP32 IoT development by providing memory safety, concurrency primitives, and a modern development experience while maintaining the performance needed for embedded systems. The combination of ESP32's powerful hardware and Rust's safety guarantees creates an excellent platform for building reliable IoT applications.

While there's a learning curve, especially if you're coming from Arduino or traditional embedded C development, the benefits in terms of code quality and reliability make it well worth the effort. The `esp-rs` project continues to improve, making Rust an increasingly attractive option for embedded systems development.

Whether you're building home automation systems, environmental monitoring devices, or industrial IoT applications, consider giving Rust on ESP32 a try for your next project. The safety, performance, and developer experience improvements might just make you a convert!

## Resources

- [esp-rs GitHub organization](https://github.com/esp-rs) - Home of Rust support for ESP devices
- [The Embedded Rust Book](https://docs.rust-embedded.org/book/) - General guide to Rust for embedded development
- [ESP32 IDF Rust Crate](https://crates.io/crates/esp-idf-sys) - Low-level bindings to ESP-IDF
- [Embassy](https://embassy.dev/) - Framework for embedded Rust applications
