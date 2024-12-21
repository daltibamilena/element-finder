import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import axios from 'axios'
import ErrorHandler from 'src/utils/error-handler/ErrorHandler'
import { ErrorMessages } from 'src/utils/error-handler/ErrorMessages'
import { ScrapPageQueryDTO } from 'src/dto/scrap-page-query.dto'
import { removeBreakLines } from "src/utils/string-format";

@Injectable()
export class AppService {
  setHello(): string {
    return 'Hello World!'
  }

  async scrapPage(params: ScrapPageQueryDTO): Promise<object> {
    const { url, element } = params
    try {
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        timeout: 10000,
      })

      const $ = cheerio.load(data)
      const elementsFound = $(element)

      if (elementsFound.length === 0) {
        throw ErrorHandler.handleScrapingError({
          message: ErrorMessages.ELEMENT_NOT_FOUND,
        })
      }

      return elementsFound
        .map((index, div) => (
          {
            index,
            value: removeBreakLines($(div).text()),
          }
        ))
        .get()


    } catch (error: any) {
      throw ErrorHandler.handleAppError(error)
    }
  }

  pleaseHelp(): string {
    return `
      **Hi there! Here I will show how to find your element:**

      1. **Selecting by Tag Name:**
         - To select all elements of a specific tag (e.g., <div>):
           \`div\`
           - Example: \`element=div\`

      2. **Selecting by Class:**
         - To select all elements with a specific class (e.g., .my-class):
           \`.my-class'\`
         - Example: \`element=.my-class\`

      3. **Selecting by ID:**
         - To select an element by its ID (e.g., #my-id):
           \ #my-id
         - Example: \`element=#my-id\`

      4. **Selecting by Attribute:**
         - To select elements with a specific attribute (e.g., data-testid="title"):
           \ span[data-testid="title"]
         - Example: \`element=span[data-testid="title"]\`

      5. **Selecting by Multiple Conditions:**
         - To select elements with multiple conditions (e.g., <div class="my-class" id="header">):
           \ div.my-class#header
         - Example: \`element=div.my-class#header\`
     
      6. **Selecting your url to scrap:**
        - To select your url to scrap (e.g., http://books.toscrape.com,  https://quotes.toscrape.com, http://www.example.com ):
          \ http://www.example.com
        - Example: \`url=http://www.example.com\`
    `
  }
}
