# File Naming And Structure Convetion

- Components should be PascalCase and regular javascript files should be camelCase
- If a directory is for a component then the directory should have the name of the componenet
- You can have a single component in a directory or you can have the main component as well as sub components
- Componenet name should be a 'thing' rather than an 'action'. For example UploadPartButon instead
  of UploadPart. Files that just contain a function should be an action like downloadBlob.js
- The component file can be the same as the directory or it can be index.jsx. Whichever you prefer
- A good approach for handling subcomponents might be to just start with the sub componenet files in
  the same directory as the main componenet until the sub componenets start growing and having more
  functions and files and then you can give the sub component its own directory
- If a subcomponent has more than 1 file, probably put it in its own direcotry. If it only has one
  file, put it in its own directory or just leave it in the same directory as the main componenet

Examples:

```
components/
  AnalysisPage/
    AnalysisPage.jsx
    UploadPartButton.jsx
    ViewPartsButton.jsx
  Header/
    Header.jsx
```

```
components/
  AnalysisPage/
    AnalysisPage.jsx
    UploadPartButton/
      UploadPartButton.jsx
    ViewPartsButton/
      ViewPartsButton.jsx
      downloadBlob.js
  Header/
    Header.jsx
```

```
components/
  AnalysisPage/
    index.jsx
    UploadPartButton/
      index.jsx
    ViewPartsButton/
      index.jsx
      downloadBlob.js
  Header/
    index.jsx
```


Definition:
Sub Component: A component that is just used inside of another bigger component. For example
UploadPartButton and ViewPartsButton are sub componenets of AnalysisPage
