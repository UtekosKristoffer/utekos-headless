# Markdown Editor Syntax Rules and Specifications {#markdown-rules}

The Markdown editor in Oxygen XML Developer Eclipse plugin uses rules that were integrated from the most common set of [default Markdown syntax rules](http://daringfireball.net/projects/markdown/syntax) along with many of the [GitHub Flavored Markdown rules](https://help.github.com/categories/writing-on-github/).

This topic lists the Oxygen XML Developer Eclipse plugin implementation of the most commonly used syntax rules.

## Headers {#headers .section}

The Markdown editor supports two styles of headers, Setext and Atx.

### Setext Style

    Setext-style headers are underlined using equal signs (for first-level headers) and dashes (for second-level headers). Any number of equal signs or dashes will result in the same output.

    **Example: Setext Style Headers**

    ```text
    First-Level Header (H1)
    ========
    
    Second-Level Header (H2)
    ------------
    ```

### Atx Style

    Atx-style headers use 1-6 hash characters at the start of the line, corresponding to header levels 1-6. Optionally, you may close atx-style headers. This is purely cosmetic and the closing hashes do not need to match the number of hashes used to open the header. It is the number of opening hashes that determines the header level.

    **Example: Atx Style Headers**

    ```ini
    # H1 text #
    ## H2 text 
    ### H3 text ###### 
    #### H4 text
    ##### H5 text ###
    ###### H6 text
    ```


## Horizontal Rules (for HTML output only) {#horizontal_rules .section}

You can produce a horizontal rule tag (`<hr>`) by placing three or more hyphens, asterisks, or underscores on a line by themselves (they also need to be preceded and followed by a blank line). Optionally, they can be separated by spaces.

#### Example: Horizontal Rules

```ini

* * *

*****

---------------------------------------

_ _ _ _

```

## Paragraphs and Line Breaks {#paragraphs_and_line_breaks .section}

A paragraph is simply one or more consecutive lines of text, separated by one or more blank lines. The text at the beginning of a paragraph should not be indented with spaces or tabs. To create a new paragraph, simply insert a blank line in between them.

**Important:** When converting to HTML, if you break a paragraph on multiple lines (without a blank line in between them), it will create a break tag (`<br>`. When converting to DITA, the text is kept in a single paragraph in this case and a blank line is required to break a paragraph. This behavior differs slightly from the default Markdown rules.

#### Example: Paragraphs

```ini
This is a paragraph that contains
two lines of text. (In HTML, a break tag is created in between the two lines)

This is a new paragraph.
```

## Styling Text {#styling_text .section}

The Markdown editor supports some syntax rules for styling text (such as bold, italic, or strikethrough).

### Italic (Emphasis)

    Text wrapped with one asterisk or underscore produces an italic (emphasis) tag.

    ```ini
    *italic*
    _italic_
    ```

### Bold (Strong)

    Text wrapped with two asterisks or underscores produces a bold (strong) tag.

    ```ini
    **bold**
    __bold__
    ```

### Strikethrough

    In HTML only, text wrapped with two tildes (`~~`) produces a strikethrough tag.

    ```ini
    ~~strikethrough~~
    ```

### Underline

    Text wrapped with two plus signs (`++`) produces an underline tag.

    ```ini
    ++underline++
    ```


**Tip:** You can also combine these styling rules. For example, `**BoldText _ItalicText_ BoldText**` would produce italicized text within bold text. Also, if you surround an asterisk or underscore with spaces, it will be treated as a literal asterisk or underscore. To produce a literal asterisk or underscore at a position where it would otherwise be used as a styling delimiter, you can escape it with a backslash (for example, `\*literal asterisks\*`.

## Links {#links .section}

The Markdown editor supports two types of links, inline and reference. In both cases, it begins with link text that is delimited by \[square brackets\].

### Inline Links

    To create an inline link, use a set of regular parentheses immediately after the closing square bracket for the link text. Inside the parentheses, put the URL where you want the link to point, and optionally a title surrounded in quotes. Also, if you reference a local resource on the same server, you can use relative paths.

    **Examples: Inline Link**

    With a title:

    ```ini
    Text with [example link text](http://www.example.com/path "Title") inline link and title.
    ```

    Without a title:

    ```ini
    Text with [example link text](http://www.example.com/path) inline link without a title.
    ```

    Relative path:

    ```ini
    Text with [example link text](/relative_path/) inline link with relative path.
    ```

### Reference Links

    Reference-type links use a second set of square brackets that include a label (link identifier) to reference the target for the link (link identifier may consist of letters, numbers, spaces, and punctuation and it is not case-sensitive). You can optionally use a space to separate the sets of brackets. The labels (link identifiers) are only used for creating the links and do not appear in the output.

    ```ini
    Text with [link text1][id 1] a reference-type link and [link text2][id_2] another one.
    ```

    Then, somewhere in the document, you need to define your link label on a line by itself. The link identifier must be within square brackets followed by a colon, then after one or more spaces the URL for the link. Optionally this can be followed by a title enclosed in single quotes, double quotes, or parentheses. Also, the link may optionally be enclosed in angle brackets (`< >`).

    ```ini
    [id 1]: http://example1.com/ "Optional Title"
    [id_2]: <http://example2.com/> "Optional Title2"
    ```

    Other notes about Reference Links:

    -   You can put the title on a second line and use extra spaces or tabs for padding. This is useful for aesthetics when the URL is long.

        ```ini
        [id]: http://example.com/long/path/to/resource/here
            "Optional Title Here"
        ```

    -   The label (link identifier) can be missing, in which case the link text (in square brackets) is used as the name.

        ```ini
        [My Link][]
        ```

        and then defined as:

        ```ini
        [My Link]: http://example.com/
        ```


## Automatic Links {#automatic_links .section}

The Markdown editor supports a shortcut style for creating automatic links for URLs and email addresses. You simply surround the URL or email address with angle brackets.

**Note:** These automatic links only work properly in HTML conversions. The Preview pane may display them properly in the DITA tab, but the DITA output will not properly recognize the format.

### URLs

    By surrounding a URL with angle brackets, you can show the actual text of the URL while also making it clickable in the output.

    ```ini
    <http://example.com/>
    ```

    For example, in HTML it is converted to:

    ```ini
    <a href="http://example.com/">http://example.com/</a>
    ```

### Email Addresses

    Automatic links for email addresses work similarly, except that Markdown will also perform a bit of randomized decimal and hex entity-encoding to help obscure your address from address-harvesting spambots.

    ```ini
    <address@example.com>
    ```

    In HTML, it is converted to something like:

    ```ini
    <a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;
    &#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;
    &#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;
    &#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>
    ```


## Images {#images .section}

The Markdown editor uses an image syntax that is intended to resemble the syntax for two types of links (inline and reference). In both cases, the syntax for images begins with an exclamation mark, followed by `Alt` attribute text surrounded by square brackets, and then followed by a set of parentheses that contain the URL or path to the image.

### Inline Images

    For inline images, use a set of regular parentheses immediately after the closing square bracket for the `Alt` attribute text. Inside the parentheses, put the URL or path of the image, and optionally a title surrounded in quotes.

    **Examples: Inline Images**

    With a title:

    ```ini
    Text with ![Alt text](/path/to/img.jpg "Optional title") inline image and a title.
    ```

    Without a title:

    ```ini
    Text with ![Alt text](/path/to/img.jpg) inline link without a title.
    ```

### Reference Images

    For reference-type images, use a second set of square brackets that include a label (image identifier) to identify the image (it may consist of letters, numbers, spaces, and punctuation and it is not case-sensitive). You can optionally use a space to separate the sets of brackets. The labels (image identifiers) do not appear in the output.

    ```ini
    Text with ![Alt text1][id] a reference-type image.
    ```

    Then, somewhere in the document, you need to define your image label on a line by itself. The image identifier must be within square brackets followed by a colon, then after one or more spaces the URL or path of the image. Optionally this can be followed by a title enclosed in single quotes, double quotes, or parentheses.

    ```ini
    [id]: url/to/image "Optional Title"
    ```


## Blockquotes {#blockquotes .section}

The Markdown editor uses email-style greater than characters (`>`) for blockquotes. You only need to put the `>` before the first line of a hard-wrapped paragraph, but it looks better (and is clearer) if you put a `>` before every line.

### Example: Blockquotes

    ```ini
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    > 
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.
    ```

### Example: Nested Blockquotes

    Blockquotes can be nested by adding additional levels of `>` characters.

    ```ini
    > This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.
    ```

### Example: Blockquotes with Other Markdown Elements

    Blockquotes can also contain other Markdown elements (such as headers, lists, and code blocks).

    ```ini
    > ## This is a header.
    > 
    > 1.   This is the first list item.
    > 2.   This is the second list item.
    > 
    > Here's some example code:
    > 
    >     return shell_exec("echo $input | $markdown_script")
    ```


## Quoting Code (Inline and Code Blocks) {#quoting_code_inline_and_code_blocks .section}

The Markdown editor supports quoting code or commands inline within a sentence or in distinct blocks.

### Inline

    You can quote or emphasize code within a sentence (inline) with single backticks (```). The text within the backticks will not be formatted.

    **Example: Inline Code Emphasis**

    ```ini
    This is a normal sentence with a `code` in the middle. 
    ```

### Code Blocks

    You can format code or text into its own distinct block by inserting a blank line before and after the content and using at least 4 spaces (or 1 tab), or by using opening and closing triple backticks (`````) on separate lines.

    **Example: Code Block**

    ```ini
    This is a normal paragraph:
    
        This is a code block
    
    This is a normal paragraph:
    
    ```
    This is a code block
    ```
    ```

    One level of indentation is removed from each line of a codeblock and it continues until it reaches a line that is not indented (or until the closing backticks).

    **Example: Code Block with Indentation**

    ```ini
        tell application "something"
            beep
        end tell
    ```

    For example, in HTML the result would look like this:

    ```ini
    <pre><code>tell application "Foo"
        beep
    end tell
    </code></pre>
    ```


    **Example: Syntax Highlighting in Code Block**

    ```ini
    ```css
    input[type="submit"] {
        color: white;
        font-weight: bold;
    ```

## Inline XHTML (for HTML output only) {#inline_xhtml .section}

The Markdown editor supports writing inline XHTML. Since Markdown is just a writing format, it requires a conversion for publishing purposes. If you are using the HTML conversion, for any markup that is not covered by Markdown syntax, you can simply use XHTML syntax.

#### Example: Inline XHTML

```ini
This is a regular paragraph.

<table>
    <tr>
        <td>Col 1</td>
        <td>Col 2</td>
    </tr>
</table>

This is another regular paragraph.
```

## Lists {#lists .section}

The Markdown editor supports ordered and unordered lists. You can also insert [blockquotes](markdown-rules.md#blockquotes) and [code blocks](markdown-rules.md#quoting_code_inline_and_code_blocks) inside list items. List markers typically start at the left margin, but may be indented by up to three spaces.

### Unordered Lists

    For unordered lists, you can use asterisks (`*`), plus signs (`+`), and hyphens (`-`) interchangeably.

    ```ini
    * List item 1
    + List item 2
    - List item 3
    ```

### Ordered Lists

    For ordered lists, use numbers followed by periods. The actual numbers you use have no effect on the output. It simply converts them to list items within an ordered list and the actual number of list items will determine the numbers in the output.

    ```ini
    1. List item 1
    8. List item 2
    5. List item 3
    ```

### Nested Lists

    You can create nested lists by indenting lines by three spaces.

    ```ini
    1. Ordered list item 1
       1. Nested ordered list item 1
       2. Nested ordered list item 2
          * 2nd level nested unordered list item 1
          * 2nd level nested unordered list item 2
             * 3rd level nested unordered list item 1
    2. Ordered list item 2  
    ```

### Paragraphs Inside Lists

    If list items are separated by blank lines, Markdown will wrap the items in a paragraph in the output.

    ```ini
    * List item 1
    
    * List item 2
    ```

    For both DITA and HTML output, this would result in:

    ```ini
    <ul>
    <li><p>List item 1</p></li>
    <li><p>List item 2</p></li>
    </ul>
    ```

### Multiple Paragraphs Inside Lists

    List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab. Optionally, you can also indent each line of a paragraph to make it look nicer.

    ```ini
    1.  This is a list item with two paragraphs. Lorem ipsum dolor
        sit amet, consectetuer adipiscing elit. Aliquam hendrerit
        mi posuere lectus.
    
        Vestibulum enim wisi, viverra nec, fringilla in, laoreet
        vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
        sit amet velit.
    
    2.  Suspendisse id sem consectetuer libero luctus adipiscing.
    ```

### Blockquotes Inside Lists

    To put a blockquote within a list item, the blockquote delimiters (`>`) need to be indented so that they are under the first letter of the text after the list item marker.

    ```ini
    *   A list item with a blockquote:
        > This is a blockquote
        > inside a list item.
    ```

### Code Blocks Inside Lists

    To put a code block within a list item, insert an empty line in between the list item and the code block, and the code block needs to be indented twice (with 8 spaces or 2 tabs), or if you are using the triple backticks method, the opening triple backtick needs to be indented with 4 spaces or 1 tab.

    ```ini
    *   A list item with a code block:
    
            This is a code block inside a list item
    
        ```
        This is a code block inside a list item using the backticks method
        ```
    ```


## Task Lists {#task_lists .section}

You can create task lists by prefacing list items with a hyphen followed by a space followed by square brackets (`- [ ]`). To mark a task as complete, use `- [x]`.

#### Example: Task Lists

```ini
- [ ] Unfinished task 1
- [x] Finished task 2
```

## Definition Lists {#definition_lists .section}

You can create definition lists by using a colon plus a space for each list item.

#### Example: Definition Lists

```ini
Term 1
: Definition A
: Definition B
```

## Tables {#tables .section}

You can create tables in the Markdown editor by using pipes (`|`) and hyphens (`-`).

### Creating a Table

    Pipes are used to separate each column, while hyphens are used to create column headers. The pipes on either end of the table are optional. Cells can vary in width and do not need to be perfectly aligned within columns, but there must be at least three hyphens in each column of the header row.

    ```ini
    | First Header  | Second Header |
    | ------------- | ------------- |
    | Column 1 Row 1 Cell  | Column 2 Row 1 Cell  |
    | Column 1 Row 2 Cell  | Column 2 Row 2 Cell  |
    ```

### Formatting Rules in Table Cells

    You can use formatting rules inside the cells of the table (such as links, inline code blocks, and text styling).

    ```ini
    | First Header  | Second Header |
    | --- | --- |
    | `inline code`  | Content with **bold text** inside cell  |
    ```

### Aligning Text in Tables

    You can align text to the left, right, or center of a column by including colons (`:`) to the left, right, or on both sides of the hyphens within the header row.

    ```ini
    | Left-aligned | Center-aligned | Right-aligned |
    | :---         |     :---:      |          ---: |
    | Content Cell | Content Cell   | Content Cell  |
    ```

### Joining Cells (Span a Cell Over Multiple Columns)

    You can join cells horizontally (span a cell over multiple columns) by using multiple consecutive pipe characters (`|`) to the right of the particular cell. The number of consecutive pipes indicate the number of columns the cell will span (`||` for two, `|||` for three, and so on).

    ```ini
    | First Header | Second Header | Third Header | Fourth Header |
    | ------------ | ------------- | ------------ | ------------- |
    | Content Cell | *Cell Span Over 3 Columns* |||
    ```


## Emoji {#emoji .section}

You can add emoji in the Markdown editor by surrounding the EMOJICODE with colons (`:EMOJICODE:`).

#### Example: Emoji

```ini
:smile:
:laughing:
```

The resulting emoticons will appear in the output, but they are not displayed in the Preview pane.

For a full list of available emoji codes, see [Emoji Cheat Sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/).

## Backslash Escapes {#backslash_escapes .section}

You can ignore Markdown formatting by using backslash escapes (`\`) to generate literal characters that would otherwise have special meaning in the Markdown syntax. For example, if you want to surround a word with literal asterisks (instead of an italic or emphasis tag), you can use backslashes to escape the asterisks.

```ini
\*literal asterisks\*
```

The Markdown editor provides backslash escapes for the following characters:

```ini
\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark
```

## Automatic Escaping for Special Characters {#automatic_escaping_for_special_characters .section}

The Markdown editor includes support for automatically escaping special characters such as angle brackets (`< >`) and ampersands (`&`). If you want to use them as literal characters, you must escape them as entities, as in the table below. The exception to this is in HTML output, if the special characters for a valid tag (for example, `<b>`), they are treated as literal characters and escaping is not necessary.

|Literal Character|Escaping Code|
|-----------------|-------------|
|**&lt;**|**&amp;lt;**|
|**&gt;**|**&amp;gt;**|
|**&amp;**|**&amp;amp;**|

## Footnotes {#footnotes .section}

The Markdown editor in Oxygen XML Developer Eclipse plugin supports normal and inline footnotes. The following examples show the required syntax.

### Example: Normal Footnote

    ```ini
    Here is a footnote reference,[^1]
    
    [^1]: Here is the footnote.
    ```

### Example: Normal Footnote with Multiple Blocks

    ```ini
    Here is a footnote reference,[^longnote]
    
    [^longnote]: Here is the footnote with multiple blocks.
    
        Subsequent paragraphs are indented with 4 spaces or 1 tab to show that they
    belong to the previous footnote.
    ```

### Example: Inline Footnote

    ```ini
    Here is an inline note.^[Inlines notes are easier to write, since
    you don't have to pick an identifier and move down to type the
    note.]
    ```


## Latex Mathematical Equations {#section_xtv_kkd_2bc .section}

Mathematical equations in Latex format [can be specified](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) either inline or as blocks.

Example of an inline equation:

```ini
$f(x) = x^2$
```

Such equations are automatically preserved as `<foreign>` elements when converting the Markdown content to DITA XML and with the addition of [editing and publishing plugins](https://blog.oxygenxml.com/topics/adding-latex-equation-support-dita.html), they can be rendered in the Markdown editor's **DITA** preview tab and when the Markdown content is published as part of a DITA map.

**Parent topic:**[Editing Markdown Documents](../topics/editing-markdown.md)

**Previous topic:**[Automatic Validation in Markdown Documents](../topics/markdown-validation.md)

**Next topic:**[Other Supported Document Types](../topics/other-doc-types.md)

**Related information**  


[Default Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)

[GitHub Flavored Markdown Rules](https://help.github.com/categories/writing-on-github/)

[Markdown Editor](markdown-editor.md#)

[Actions Available in the Markdown Editor](markdown-actions.md#)

⚛️React Not Detected
React is not detected on this page.
Please ensure you're visiting a React application.
