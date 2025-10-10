export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--header-bg)' }} className="py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-white text-sm">
            © {currentYear} Salim Saay. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}