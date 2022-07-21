import { Footer } from 'flowbite-react';

export default function Footarea() {
    return (
        <Footer container={true}>
            <Footer.Copyright
                href="/"
                by=" 2023-DA-PTT™ "
            />
            <Footer.LinkGroup>
                <Footer.Link href="https://github.com/2023-DA-PTT/">
                Github
                </Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    )
}