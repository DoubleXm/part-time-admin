<script>
export default {
  name: "Logo",
  functional: true,
  props: {
    isCollapse: {
      type: Boolean,
      reauired: true
    }
  },
  render(h, context) {
    const { isCollapse } = context.props;

    return (
      <div class="side-logo">
        {isCollapse ? <h3>PT</h3> : <h3>PartTimeAdmin</h3>}
      </div>
    );
  }
};
</script>

<style lang="scss">
.side-logo {
  h3 {
    margin: 0;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    font-weight: 500;
    color: #fff;
    background-color: #001529;
  }
}
</style>
