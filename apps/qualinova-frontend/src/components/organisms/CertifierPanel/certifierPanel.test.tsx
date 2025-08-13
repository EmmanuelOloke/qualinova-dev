import { render, screen, fireEvent } from '@testing-library/react';
import CertifierDashboard from './certifierPanel';
import { initialAssignedCertificates } from './mockAssignedCertificates';

describe('CertifierDashboard', () => {
    it('renders the tabs', () => {
        render(<CertifierDashboard />);
        expect(screen.getByRole('button', { name: 'Assigned Certificates' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Certificate Templates' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Assigned Certificates' })).toBeInTheDocument();
    });

    it('renders the assigned certificates table with mock data and responsive headers', () => {
        render(<CertifierDashboard />);
        expect(screen.getByText('Certificate ID')).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /Certificate Type/ })).toBeInTheDocument();
        expect(screen.getByText('Receiving Company')).toBeInTheDocument();
        expect(screen.getByText('Assignment Date')).toBeInTheDocument();
        expect(screen.getByText('Expiration Date')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText(initialAssignedCertificates[0].id)).toBeInTheDocument();
        // Use getAllByText for certificateType (truncated, responsive)
        const certTypeCells = screen.getAllByText(
            (content, node) =>
                node !== null &&
                node.textContent === initialAssignedCertificates[0].certificateType,
        );
        expect(certTypeCells.length).toBeGreaterThan(0);
        expect(
            screen.getByText(initialAssignedCertificates[0].receivingCompany),
        ).toBeInTheDocument();
        // TODO: Add test for empty state and mobile responsiveness
    });

    it('shows and selects from the custom status dropdown', () => {
        render(<CertifierDashboard />);
        const dropdownButton = screen.getByRole('button', { name: /all statuses/i });
        fireEvent.click(dropdownButton);

        // Find dropdown options specifically by their role as buttons within the dropdown
        const verifiedOption = screen
            .getAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Verified' &&
                    button.className.includes('w-full text-left'),
            );
        const pendingOption = screen
            .getAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Pending' &&
                    button.className.includes('w-full text-left'),
            );
        const expiredOption = screen
            .getAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Expired' &&
                    button.className.includes('w-full text-left'),
            );

        expect(verifiedOption).toBeInTheDocument();
        expect(pendingOption).toBeInTheDocument();
        expect(expiredOption).toBeInTheDocument();

        // Click the Pending option
        fireEvent.click(pendingOption!);

        // After selecting Pending, the dropdown should close and the button text should update
        expect(dropdownButton).toHaveTextContent('Pending');

        // The dropdown options should no longer be visible (dropdown is closed)
        const closedVerifiedOption = screen
            .queryAllByRole('button')
            .find(
                (button) =>
                    button.textContent === 'Verified' &&
                    button.className.includes('w-full text-left'),
            );
        expect(closedVerifiedOption).toBeUndefined();
    });
});
