import ngrok from '@ngrok/ngrok';

export async function setupNgrok(port) {
    try {
        const listener = await ngrok.connect({
            addr: port,
            authtoken: process.env.NGROK_AUTH_TOKEN,
            // Optional configurations:
            // domain: "your-domain.ngrok.io",
            // basic_auth: ["user:pass"], // For password protection
            // oauth_provider: "google", // For OAuth
            // oauth_allow_domains: ["yourdomain.com"],
        });
        
        console.log(`🚀 Ngrok tunnel established at: ${listener.url()}`);
        return listener.url();
    } catch (error) {
        console.error('❌ Ngrok connection failed:', error.message);
        return null;
    }
}