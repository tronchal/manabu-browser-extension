export default function(data: { [key: string]: any }) {
    return `
<link href="components/theme-toggle/theme-toggle.css" rel="stylesheet">

<button class="darkmode-toggle absolute top-4 right-4 p-2 rounded-full cursor-pointer aspect-square w-10 shadow-lg bg-card"
        :click="toggleDarkMode()">
</button>
`;
}
