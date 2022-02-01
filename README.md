#tm-peer-helper

You can run locally by cloning the repo and opening the `index.html` file in a browser. I will update the readme once it's uploaded somewhere public.

This is a simple tool for configuring a Tendermint validator / sentry node's peering configuration in the config.toml file.
It will generate a snippet of text that can be used to set the peers correctly.
One of the most time-consuming parts of setting up new nodes is getting the P2P configuration correct to ensure all nodes are communicating, and
this tool can help with that.

<ul>
<li>A node ID, and IPv4 address are required for each entry.</li>
<li>Providing an IPv6 address is optional. If provided, the Validator will attempt to connect outbound on IPv6 to sentries. This can provide resilience in the case of BGP routing failures.</li>
<li>If the P2P port is left empty, it will default to 26656</li>
<li>It is not necessary to fill in information for all validator nodes, if left empty it will be ignored.</li>
</ul>
<p>This tool does absolutely no error checking on the input.</p>
