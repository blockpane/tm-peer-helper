let seeds, valNodeId, valIPv4, valPort, sentry1Id, sentry1Ipv4, sentry1Ipv6, sentry1Port, sentry2Id, sentry2Ipv4, sentry2Ipv6, sentry2Port, sentry3Id, sentry3Ipv4, sentry3Ipv6, sentry3Port, sentry4Id, sentry4Ipv4, sentry4Ipv6, sentry4Port, sentry5Id, sentry5Ipv4, sentry5Ipv6, sentry5Port = ""
let valPrivate = true

function buildConfigs() {
    seeds = document.getElementById('seedInput').value

    valNodeId = document.getElementById('valInput').value
    valIPv4 = document.getElementById('valIpInput').value
    valPort = document.getElementById('valPortInput').value
    if (valPort === "") {
        valPort = "26656"
    }
    valPrivate = document.getElementById('valPrivInput').checked

    sentry1Id = document.getElementById('sentry1Input').value
    sentry1Ipv4 = document.getElementById('sentry1IpInput').value
    sentry1Ipv6 = document.getElementById('sentry1Ip6Input').value
    sentry1Port = document.getElementById('sentry1PortInput').value
    if (sentry1Port === "") {
        sentry1Port = "26656"
    }

    sentry2Id = document.getElementById('sentry2Input').value
    sentry2Ipv4 = document.getElementById('sentry2IpInput').value
    sentry2Ipv6 = document.getElementById('sentry2Ip6Input').value
    sentry2Port = document.getElementById('sentry2PortInput').value
    if (sentry2Port === "") {
        sentry2Port = "26656"
    }

    sentry3Id = document.getElementById('sentry3Input').value
    sentry3Ipv4 = document.getElementById('sentry3IpInput').value
    sentry3Ipv6 = document.getElementById('sentry3Ip6Input').value
    sentry3Port = document.getElementById('sentry3PortInput').value
    if (sentry3Port === "") {
        sentry3Port = "26656"
    }

    sentry4Id = document.getElementById('sentry4Input').value
    sentry4Ipv4 = document.getElementById('sentry4IpInput').value
    sentry4Ipv6 = document.getElementById('sentry4Ip6Input').value
    sentry4Port = document.getElementById('sentry4PortInput').value
    if (sentry4Port === "") {
        sentry4Port = "26656"
    }

    sentry5Id = document.getElementById('sentry5Input').value
    sentry5Ipv4 = document.getElementById('sentry5IpInput').value
    sentry5Ipv6 = document.getElementById('sentry5Ip6Input').value
    sentry5Port = document.getElementById('sentry5PortInput').value
    if (sentry5Port === "") {
        sentry5Port = "26656"
    }

    document.getElementById('valOutput').innerText = createValConfig()
    document.getElementById('sentry1Output').innerText = createSentryConfig(sentry1Id, sentry1Ipv4, sentry1Port, sentry2Id, sentry2Ipv4, sentry2Port, sentry3Id, sentry3Ipv4, sentry3Port, sentry4Id, sentry4Ipv4, sentry4Port, sentry5Id, sentry5Ipv4, sentry5Port)
    document.getElementById('sentry2Output').innerText = createSentryConfig(sentry2Id, sentry2Ipv4, sentry2Port, sentry1Id, sentry1Ipv4, sentry1Port, sentry3Id, sentry3Ipv4, sentry3Port, sentry4Id, sentry4Ipv4, sentry4Port, sentry5Id, sentry5Ipv4, sentry5Port)
    document.getElementById('sentry3Output').innerText = createSentryConfig(sentry3Id, sentry3Ipv4, sentry3Port, sentry1Id, sentry1Ipv4, sentry1Port, sentry2Id, sentry2Ipv4, sentry2Port, sentry4Id, sentry4Ipv4, sentry4Port, sentry5Id, sentry5Ipv4, sentry5Port)
    document.getElementById('sentry4Output').innerText = createSentryConfig(sentry4Id, sentry4Ipv4, sentry4Port, sentry1Id, sentry1Ipv4, sentry1Port, sentry2Id, sentry2Ipv4, sentry2Port, sentry3Id, sentry3Ipv4, sentry3Port, sentry5Id, sentry5Ipv4, sentry5Port)
    document.getElementById('sentry5Output').innerText = createSentryConfig(sentry5Id, sentry5Ipv4, sentry5Port, sentry1Id, sentry1Ipv4, sentry1Port, sentry2Id, sentry2Ipv4, sentry2Port, sentry3Id, sentry3Ipv4, sentry3Port, sentry4Id, sentry4Ipv4, sentry4Port)

}

function createValConfig() {
    let valText
    if (!valPrivate) {
        valText = `external_address = "${valIPv4}:${valPort}"\npex = true\n`
    } else {
        valText = `external_address = ""\npex = false\n`
    }
    if (!valPrivate && seeds !== "") {
        valText += `seeds = "${seeds}"\n`
    } else {
        valText += `seeds = ""\n`
    }

    let persistent = []
    let unconditional = []

    const sentries = function (id, ipv4, ipv6, port) {
        if (id !== "") {
            let tempIp = ipv4
            if (ipv6 !== "") {
                tempIp = ipv6
            }
            persistent.push(`${id}@${tempIp}:${port}`)
            unconditional.push(id)
        }
    }
    sentries(sentry1Id, sentry1Ipv4, sentry1Ipv6, sentry1Port)
    sentries(sentry2Id, sentry2Ipv4, sentry2Ipv6, sentry2Port)
    sentries(sentry3Id, sentry3Ipv4, sentry3Ipv6, sentry3Port)
    sentries(sentry4Id, sentry4Ipv4, sentry4Ipv6, sentry4Port)
    sentries(sentry5Id, sentry5Ipv4, sentry5Ipv6, sentry5Port)

    valText += `persistent_peers = "${persistent.join(",")}"\n`
    valText += `unconditional_peer_ids = "${unconditional.join(",")}"\n`
    return valText
}

function createSentryConfig(myId, myIp, myPort, s1Id, s1Ip, s1port, s2Id, s2Ip, s2port, s3Id, s3Ip, s3port, s4Id, s4Ip, s4port) {
    if (myId === "") {
        return ""
    }
    let config = `external_address = "${myIp}:${myPort}"\npex = true\n`
    config += `seeds = "${seeds}"\n`

    let persistent = []
    let unconditional = []
    persistent.push(`${valNodeId}@${valIPv4}:${valPort}`)
    unconditional.push(valNodeId)
    const peers = function (id, ipv4, port) {
        if (id !== "") {
            persistent.push(`${id}@${ipv4}:${port}`)
            unconditional.push(id)
        }
    }
    peers(s1Id, s1Ip, s1port)
    peers(s2Id, s2Ip, s2port)
    peers(s3Id, s3Ip, s3port)
    peers(s4Id, s4Ip, s4port)
    config += `persistent_peers = "${persistent.join(",")}"\n`
    config += `unconditional_peer_ids = "${unconditional.join(",")}"\n`
    if (valPrivate) {
        config += `private_peer_ids = "${valNodeId}"\n`
    } else {
        config += `private_peer_ids = ""\n`
    }
    console.log(config)
    return config
}
