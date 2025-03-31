# GUI Pokemon TCG Stock Manager

## Description

This project is a simple static web page that allows users to upload a JSON file generated by another project and display its contents in a more user-friendly format. The goal is to improve the readability of the results by presenting them in a structured and visually appealing way.

## Motivation

I created this web page to complement my other project, [Pokemon_TCG_Stock_Manager](https://github.com/cristobalg68/Pokemon_TCG_Stock_Manager). The JSON output from that project is not easily readable, and the console prints are not very intuitive. This web page helps users visualize the data in a clearer and more accessible manner.

## Features

Displays the results from the JSON file, including:

* Available listings for a Pokémon card.

* The lowest price of the available listings.

* Detailed card information such as:

    * Set name

    * Card number within the set

    * Image of the card

* The interface organizes the data into three distinct columns with scrollbars, making it easier to navigate:

    * Listings that need updating

    * Listings that require correction

    * Listings that need to be created

## Requirements

* No specific frameworks or libraries are required.

* No additional installation is necessary.

* The only requirement is to generate the JSON file using the [Pokemon_TCG_Stock_Manager](https://github.com/cristobalg68/Pokemon_TCG_Stock_Manager) repository and upload it to the web page.

## How to use

1. Generate the JSON file using the [Pokemon_TCG_Stock_Manager](https://github.com/cristobalg68/Pokemon_TCG_Stock_Manager) project.

2. Open the web page.

3. Upload the JSON file.

4. The page will automatically display the structured data.

## Examples of use

![image](public/example.png)
